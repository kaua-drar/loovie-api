import { Module } from '@nestjs/common';
import { PrismaMoviesRepository } from './prisma.movies.repository';
import { MoviesRepository } from './movies.repository';
import { MoviesSearch } from './movies.search';
import { TypesenseMoviesSearch } from './typesense.movies.search';

@Module({
  providers: [
    {
      provide: MoviesRepository,
      useClass: PrismaMoviesRepository,
    },
    {
      provide: MoviesSearch,
      useClass: TypesenseMoviesSearch,
    },
  ],
  exports: [MoviesRepository, MoviesSearch],
})
export class MoviesModule {}
