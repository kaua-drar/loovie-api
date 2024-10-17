import { Module } from '@nestjs/common';
import { PrismaProductionTranslationsRepository } from './prisma.production-translations.repository';
import { ProductionTranslationsRepository } from './production-translations.repository';
import { GenreTranslationsRepository } from './genre-translations.repository';
import { PrismaGenreTranslationsRepository } from './prisma.genre-translations.repository';
import { MovieTranslationsSearch } from './movie-translation.search';
import { TypesenseMovieTranslationsSearch } from './typesense.movie-translation.search';
import { GenreTranslationsSearch } from './genre-translation.search';
import { TypesenseGenreTranslationsSearch } from './typesense.genre-translation.search';

@Module({
  providers: [
    {
      provide: ProductionTranslationsRepository,
      useClass: PrismaProductionTranslationsRepository,
    },
    {
      provide: GenreTranslationsRepository,
      useClass: PrismaGenreTranslationsRepository,
    },
    {
      provide: MovieTranslationsSearch,
      useClass: TypesenseMovieTranslationsSearch,
    },
    {
      provide: GenreTranslationsSearch,
      useClass: TypesenseGenreTranslationsSearch,
    },
  ],
  exports: [
    ProductionTranslationsRepository,
    GenreTranslationsRepository,
    MovieTranslationsSearch,
    GenreTranslationsSearch,
  ],
})
export class TranslationsModule {}
