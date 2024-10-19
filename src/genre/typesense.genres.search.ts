import { TypesenseService } from 'src/search/typesense.service';
import { Genre } from './genre';
import { Injectable } from '@nestjs/common';
import { TypesenseBaseSearch } from 'src/search/typesense.base.search';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { GenresRepository } from './genres.repository';
import { GenreDocument } from 'src/translations/genre.document';
import { BaseSearchParams } from 'src/search/base.search-params';

@Injectable()
export class TypesenseGenresSearch extends TypesenseBaseSearch<
  Genre,
  GenreDocument
> {
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

  async search({ language, ...params }: BaseSearchParams) {
    return super.search({
      ...params,
      filterBy: `$genre_translations(id: * && language: ${language})`,
      includeFields: '$genre_translations(*, strategy: merge)',
      excludeFields: '$genre_translations(genreId)',
    });
  }
}
