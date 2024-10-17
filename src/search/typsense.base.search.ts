import { BaseRepository } from 'src/database/base.repository';
import { BaseSearch } from './base.search';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { TypesenseService } from './typesense.service';
import { OnModuleInit } from '@nestjs/common';

export class TypesenseBaseSearch<T extends object>
  implements BaseSearch<T>, OnModuleInit
{
  collection: string;
  rawCollection?: string;
  schema: Omit<CollectionCreateSchema, 'name'>;
  typesenseService: TypesenseService;
  repository: BaseRepository;

  constructor(typesenseService: TypesenseService, repository: BaseRepository) {
    this.typesenseService = typesenseService;
    this.repository = repository;
  }

  async onModuleInit() {
    await this.setup();
  }

  getFormattedDate(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  getCollectionByDate(date: string): string {
    return `${this.collection}__${date}`;
  }

  async createCollection(date: string): Promise<void> {
    const name = this.getCollectionByDate(date);

    await this.typesenseService.collections().create({
      ...this.schema,
      name,
    });
  }

  async upsertAlias(date: string): Promise<void> {
    await this.typesenseService.aliases().upsert(this.collection, {
      collection_name: this.getCollectionByDate(date),
    });
  }

  async setup(): Promise<void> {
    try {
      const alias = await this.typesenseService
        .aliases(this.collection)
        .retrieve();
      this.rawCollection = alias.collection_name;
    } catch (error) {
      const date = this.getFormattedDate();

      await this.createCollection(date);
      await this.upsertAlias(date);

      this.rawCollection = this.getCollectionByDate(date);
    }
  }

  async index(params: T, date?: string): Promise<void> {
    await this.typesenseService
      .collections(date ? this.getCollectionByDate(date) : this.collection)
      .documents()
      .create(params);
  }

  async reindex() {
    const date = this.getFormattedDate();

    await this.createCollection(date);

    const genreTranslations = await this.repository.findAll();

    for (const genreTranslation of genreTranslations) {
      await this.index(genreTranslation, date);
    }

    await this.upsertAlias(date);
    await this.typesenseService.collections(this.rawCollection).delete();

    this.rawCollection = this.getCollectionByDate(date);
  }
}
