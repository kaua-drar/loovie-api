import { TypesenseService } from 'src/search/typesense.service';
import { Injectable } from '@nestjs/common';
import { TypesenseBaseSearch } from 'src/search/typesense.base.search';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { ProductionTranslationsRepository } from './production-translations.repository';
import { ProductionTranslationDocument } from './production-translation.document';
import { ProductionTranslationIndexDto } from './dtos/production-translation.index.dto';
import { MoviesRepository } from 'src/movie/movies.repository';

@Injectable()
export class TypesenseMovieTranslationsSearch extends TypesenseBaseSearch<
  ProductionTranslationIndexDto,
  ProductionTranslationDocument & { movieId: string }
> {
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
      // The following fields are only necessary for sorting purposes
      {
        name: 'releaseDate',
        type: 'int64',
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
    ],
  };
  moviesRepository: MoviesRepository;

  constructor(
    typesenseService: TypesenseService,
    repository: ProductionTranslationsRepository,
    moviesRepository: MoviesRepository,
  ) {
    super(typesenseService, repository);

    this.moviesRepository = moviesRepository;
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
      releaseDate,
      popularity,
      voteAverage,
      voteCount,
    }: ProductionTranslationIndexDto,
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
        releaseDate: releaseDate?.getTime(),
        popularity,
        voteAverage,
        voteCount,
      });
  }

  async indexAll(date: string) {
    const items = await this.repository.findAll();

    for (const item of items) {
      const movie = await this.moviesRepository.findBy({
        id: item.productionId,
      });

      await this.index(
        {
          ...item,
          releaseDate: movie.releaseDate,
          voteAverage: movie.voteAverage,
          voteCount: movie.voteCount,
          popularity: movie.popularity,
        },
        date,
      );
    }
  }
}
