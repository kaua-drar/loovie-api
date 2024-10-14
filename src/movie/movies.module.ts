import { Module } from '@nestjs/common';
import { PrismaMoviesRepository } from './prisma.movies.repository';
import { MoviesRepository } from './movies.repository';

@Module({
  providers: [
    {
      provide: MoviesRepository,
      useClass: PrismaMoviesRepository,
    },
  ],
  exports: [MoviesRepository],
})
export class MoviesModule {}
