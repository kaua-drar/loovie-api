import { MediaTranslation } from './../translations/media-translation';
import { ConfigService } from '@nestjs/config';
import { TdmbMovie } from './tmdb-movie';
import { LanguagesRepository } from 'src/language/languages.repository';
import { MoviesRepository } from 'src/movie/movies.repository';
import { Movie } from 'src/movie/movie';
import { MediaTranslationsRepository } from 'src/translations/media-translations.repository';
import { GenreTranslationsRepository } from 'src/translations/genre-translations.repository';
import { GenreTranslation } from 'src/translations/genre-translation';
import { GenresRepository } from 'src/genre/genres.repository';
import axios, { AxiosInstance } from 'axios';
import { TmdbGenre } from './tmdb-genre';
import { Genre } from 'src/genre/genre';
import { MediaGenresRepository } from 'src/genre/media-genres.repository';
import { MediaGenre } from 'src/genre/media-genre';
import { DiscoverResponse } from './tmdb-discover';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TmdbService {
  apiEndpoint: string;
  apiKey: string;
  tmdbApi: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    private readonly languagesRepository: LanguagesRepository,
    private readonly genresRepository: GenresRepository,
    private readonly moviesRepository: MoviesRepository,
    private readonly mediaTranslationsRepository: MediaTranslationsRepository,
    private readonly genreTranslationsRepository: GenreTranslationsRepository,
    private readonly mediaGenresRepository: MediaGenresRepository,
  ) {
    this.apiEndpoint = 'https://api.themoviedb.org/3';
    this.apiKey = this.configService.get('TMDB_API_KEY');
    this.tmdbApi = axios.create({
      baseURL: this.apiEndpoint,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  async discoverMovies() {
    const language = await this.languagesRepository.findOrCreate({
      code: 'pt-BR',
      name: 'Brazilian Portuguese',
    });
    const {
      data: { results: tmdbMovies },
    } = await this.tmdbApi.get<DiscoverResponse<TdmbMovie>>(
      `/discover/movie?&language=${language.code}`,
    );

    for (const tmdbMovie of tmdbMovies) {
      const movieAlreadyExists = await this.moviesRepository.exists({
        tmdbId: `Movie-${tmdbMovie.id}`,
      });

      if (movieAlreadyExists) {
        continue;
      }

      const newMovie = new Movie({
        tmdbId: `Movie-${tmdbMovie.id}`,
        originalTitle: tmdbMovie.original_title,
        originalLanguage: tmdbMovie.original_language,
        posterPath: tmdbMovie.poster_path,
        backdropPath: tmdbMovie.backdrop_path,
        releaseDate: new Date(tmdbMovie.release_date),
      });

      const movie = await this.moviesRepository.create(newMovie);

      const newTranslation = new MediaTranslation({
        languageCode: language.code,
        mediaId: movie.id,
        overview: tmdbMovie.overview,
        title: tmdbMovie.title,
      });

      await this.mediaTranslationsRepository.create(newTranslation);

      const genreIds = tmdbMovie.genre_ids;

      for (const genreId of genreIds) {
        const genre = await this.genresRepository.findBy({
          tmdbId: genreId,
        });

        if (!genre) {
          continue;
        }

        const newMediaGenre = new MediaGenre({
          genreId: genre.id,
          mediaId: movie.id,
        });

        await this.mediaGenresRepository.create(newMediaGenre);
      }
    }
  }

  async getAllGenres() {
    const language = await this.languagesRepository.findOrCreate({
      code: 'pt-BR',
      name: 'Brazilian Portuguese',
    });

    const {
      data: { genres: movieGenres },
    } = await this.tmdbApi.get<{ genres: TmdbGenre[] }>(
      `/genre/movie/list?language=${language.code}`,
    );

    const {
      data: { genres: showGenres },
    } = await this.tmdbApi.get<{ genres: TmdbGenre[] }>(
      `/genre/tv/list?language=${language.code}`,
    );

    const allGenres = [...movieGenres, ...showGenres];

    for (const tmdbGenre of allGenres) {
      const genreAlreadyExists = await this.genresRepository.exists({
        tmdbId: tmdbGenre.id,
      });

      if (genreAlreadyExists) {
        continue;
      }

      const newGenre = new Genre({
        tmdbId: tmdbGenre.id,
      });

      const genre = await this.genresRepository.create(newGenre);

      const newGenreTranslation = new GenreTranslation({
        genreId: genre.id,
        languageCode: language.code,
        name: tmdbGenre.name,
      });

      await this.genreTranslationsRepository.create(newGenreTranslation);
    }
  }
}
