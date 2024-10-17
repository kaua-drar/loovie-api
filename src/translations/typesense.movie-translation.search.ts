import { TypesenseService } from 'src/search/typesense.service';
import { ProductionTranslation } from './production-translation';
import { Injectable } from '@nestjs/common';
import { TypesenseBaseSearch } from 'src/search/typsense.base.search';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { ProductionTranslationsRepository } from './production-translations.repository';

@Injectable()
export class TypesenseMovieTranslationsSearch extends TypesenseBaseSearch<ProductionTranslation> {
  collection = 'movie_translations';
  schema: Omit<CollectionCreateSchema, 'name'> = {
    fields: [
      {
        name: 'movieId',
        type: 'string',
        reference: 'movies.id',
      },
      {
        name: 'language',
        type: 'string',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'overview',
        type: 'string',
        optional: true,
      },
      {
        name: 'posterPath',
        type: 'string',
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
  };

  constructor(
    typesenseService: TypesenseService,
    repository: ProductionTranslationsRepository,
  ) {
    super(typesenseService, repository);
  }

  async index(
    {
      id,
      productionId,
      languageCode,
      name,
      overview,
      posterPath,
      createdAt,
      updatedAt,
    }: ProductionTranslation,
    date?: string,
  ) {
    await this.typesenseService
      .collections(date ? this.getCollectionByDate(date) : this.collection)
      .documents()
      .create({
        id,
        movieId: productionId,
        language: languageCode,
        name,
        overview,
        posterPath,
        createdAt: createdAt.getTime(),
        updatedAt: updatedAt.getTime(),
      });
  }
}
