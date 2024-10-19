import { TypesenseService } from 'src/search/typesense.service';
import { Movie } from './movie';
import { Injectable } from '@nestjs/common';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { TypesenseBaseSearch } from 'src/search/typesense.base.search';
import { MoviesRepository } from './movies.repository';
import { MovieDocument } from './movie.document';

@Injectable()
export class TypesenseMoviesSearch extends TypesenseBaseSearch<
  Movie,
  MovieDocument
> {
  collection = 'movies';
  schema: Omit<CollectionCreateSchema, 'name'> = {
    fields: [
      {
        name: 'tmdbId',
        type: 'string',
      },
      {
        name: 'originalName',
        type: 'string',
      },
      {
        name: 'originalLanguage',
        type: 'string',
      },
      {
        name: 'releaseDate',
        type: 'int64',
        optional: true,
      },
      {
        name: 'backdropPath',
        type: 'string',
        optional: true,
      },
      {
        name: 'duration',
        type: 'int32',
        optional: true,
      },
      {
        name: 'voteAverage',
        type: 'float',
        optional: true,
      },
      {
        name: 'voteCount',
        type: 'int64',
        optional: true,
      },
      {
        name: 'popularity',
        type: 'float',
        optional: true,
      },
      {
        name: 'titleType',
        type: 'string',
      },
      {
        name: 'adult',
        type: 'bool',
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
    repository: MoviesRepository,
  ) {
    super(typesenseService, repository);
  }

  async index(
    {
      id,
      tmdbId,
      originalName,
      originalLanguage,
      releaseDate,
      backdropPath,
      duration,
      voteAverage,
      voteCount,
      adult,
      popularity,
      createdAt,
      updatedAt,
      titleType,
    }: Movie,
    date?: string,
  ) {
    await this.typesenseService
      .collections(date ? this.getCollectionByDate(date) : this.collection)
      .documents()
      .create({
        id,
        tmdbId,
        originalName,
        originalLanguage,
        releaseDate: releaseDate?.getTime(),
        backdropPath,
        duration,
        voteAverage,
        voteCount,
        adult,
        popularity,
        titleType,
        createdAt: createdAt.getTime(),
        updatedAt: updatedAt.getTime(),
      });
  }
}
