import { TypesenseService } from 'src/search/typesense.service';
import { Genre } from './genre';
import { Injectable } from '@nestjs/common';
import { TypesenseBaseSearch } from 'src/search/typsense.base.search';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { GenresRepository } from './genres.repository';

@Injectable()
export class TypesenseGenresSearch extends TypesenseBaseSearch<Genre> {
  collection = 'genres';
  schema: Omit<CollectionCreateSchema, 'name'> = {
    fields: [
      {
        name: 'tmdbId',
        type: 'int32',
        optional: true,
      },
      {
        name: 'createdAt',
        type: 'int64',
      },
      {
        name: 'updatedAt',
        type: 'int64',
      },
    ],
    default_sorting_field: 'createdAt',
  };

  constructor(
    typesenseService: TypesenseService,
    repository: GenresRepository,
  ) {
    super(typesenseService, repository);
  }

  async index({ id, tmdbId, createdAt, updatedAt }: Genre, date?: string) {
    await this.typesenseService
      .collections(date ? this.getCollectionByDate(date) : this.collection)
      .documents()
      .create({
        id,
        tmdbId,
        createdAt: createdAt.getTime(),
        updatedAt: updatedAt.getTime(),
      });
  }
}
