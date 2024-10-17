import { Module } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { LanguagesModule } from 'src/language/languages.module';
import { MoviesModule } from 'src/movie/movies.module';
import { TranslationsModule } from 'src/translations/translations.module';
import { GenresModule } from 'src/genre/genres.module';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    UsersModule,
    LanguagesModule,
    MoviesModule,
    TranslationsModule,
    GenresModule,
  ],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
