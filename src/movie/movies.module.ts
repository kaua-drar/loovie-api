import { forwardRef, Module } from '@nestjs/common';
import { PrismaMoviesRepository } from './prisma.movies.repository';
import { MoviesRepository } from './movies.repository';
import { MoviesSearch } from './movies.search';
import { TypesenseMoviesSearch } from './typesense.movies.search';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieTranslationsSearch } from 'src/translations/movie-translation.search';
import { TypesenseMovieTranslationsSearch } from 'src/translations/typesense.movie-translation.search';
import { TranslationsModule } from 'src/translations/translations.module';

@Module({
  controllers: [MoviesController],
  providers: [
    {
      provide: MoviesRepository,
      useClass: PrismaMoviesRepository,
    },
    {
      provide: MoviesSearch,
      useClass: TypesenseMoviesSearch,
    },
    {
      provide: MovieTranslationsSearch,
      useClass: TypesenseMovieTranslationsSearch,
    },
    MoviesService,
  ],
  imports: [forwardRef(() => TranslationsModule)],
  exports: [MoviesRepository, MoviesSearch],
})
export class MoviesModule {}
