import { GenreTranslationsRepository } from 'src/translations/genre-translations.repository';
import { TypesenseService } from 'src/search/typesense.service';
import { GenreTranslation } from './genre-translation';
import { Injectable } from '@nestjs/common';
import { TypesenseBaseSearch } from 'src/search/typsense.base.search';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

@Injectable()
export class TypesenseGenreTranslationsSearch extends TypesenseBaseSearch<GenreTranslation> {
  collection = 'genre_translations';
  schema: Omit<CollectionCreateSchema, 'name'> = {
    fields: [
      {
        name: 'genreId',
        type: 'string',
        reference: 'genres.id',
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
    repository: GenreTranslationsRepository,
  ) {
    super(typesenseService, repository);
  }

  async index(
    { id, genreId, languageCode, name, createdAt, updatedAt }: GenreTranslation,
    date?: string,
  ) {
    await this.typesenseService
      .collections(date ? this.getCollectionByDate(date) : this.collection)
      .documents()
      .create({
        id,
        genreId,
        language: languageCode,
        name,
        createdAt: createdAt.getTime(),
        updatedAt: updatedAt.getTime(),
      });
  }
}
