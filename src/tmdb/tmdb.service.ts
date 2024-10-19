import { ProductionTranslation } from '../translations/production-translation';
import { ConfigService } from '@nestjs/config';
import { TdmbMovie } from './tmdb-movie';
import { LanguagesRepository } from 'src/language/languages.repository';
import { MoviesRepository } from 'src/movie/movies.repository';
import { Movie } from 'src/movie/movie';
import { ProductionTranslationsRepository } from 'src/translations/production-translations.repository';
import { GenreTranslationsRepository } from 'src/translations/genre-translations.repository';
import { GenreTranslation } from 'src/translations/genre-translation';
import { GenresRepository } from 'src/genre/genres.repository';
import axios, { AxiosInstance } from 'axios';
import { TmdbGenre } from './tmdb-genre';
import { Genre } from 'src/genre/genre';
import { TitleGenresRepository } from 'src/genre/title-genres.repository';
import { TitleGenre } from 'src/genre/title-genre';
import { DiscoverResponse } from './tmdb-discover';
import { Injectable } from '@nestjs/common';
import { MoviesSearch } from 'src/movie/movies.search';
import { MovieTranslationsSearch } from 'src/translations/movie-translation.search';
import { GenresSearch } from 'src/genre/genres.search';
import { GenreTranslationsSearch } from 'src/translations/genre-translation.search';

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
    private readonly productionTranslationsRepository: ProductionTranslationsRepository,
    private readonly genreTranslationsRepository: GenreTranslationsRepository,
    private readonly titleGenresRepository: TitleGenresRepository,
    private readonly moviesSearch: MoviesSearch,
    private readonly movieTranslationsSearch: MovieTranslationsSearch,
    private readonly genresSearch: GenresSearch,
    private readonly genreTranslationsSearch: GenreTranslationsSearch,
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
      const tmdbId = `Movie-${tmdbMovie.id}`;

      const movieAlreadyExists = await this.moviesRepository.exists({
        tmdbId,
      });

      if (movieAlreadyExists) {
        continue;
      }

      const newMovie = new Movie({
        tmdbId,
        originalName: tmdbMovie.original_title,
        originalLanguage: tmdbMovie.original_language,
        backdropPath: tmdbMovie.backdrop_path,
        releaseDate: new Date(tmdbMovie.release_date),
        voteAverage: tmdbMovie.vote_average,
        voteCount: tmdbMovie.vote_count,
        adult: tmdbMovie.adult,
        popularity: tmdbMovie.popularity,
      });

      const movie = await this.moviesRepository.create(newMovie);

      await this.moviesSearch.index(movie);

      const newTranslation = new ProductionTranslation({
        languageCode: language.code,
        productionId: movie.id,
        posterPath: tmdbMovie.poster_path,
        overview: tmdbMovie.overview,
        name: tmdbMovie.title,
      });

      const productionTranslation =
        await this.productionTranslationsRepository.create(newTranslation);
      await this.movieTranslationsSearch.index({
        ...productionTranslation,
        releaseDate: new Date(tmdbMovie.release_date),
        voteAverage: tmdbMovie.vote_average,
        voteCount: tmdbMovie.vote_count,
        popularity: tmdbMovie.popularity,
      });

      const genreIds = tmdbMovie.genre_ids;

      for (const genreId of genreIds) {
        const genre = await this.genresRepository.findBy({
          tmdbId: genreId,
        });

        if (!genre) {
          continue;
        }

        const newTitleGenre = new TitleGenre({
          genreId: genre.id,
          titleId: movie.id,
        });

        await this.titleGenresRepository.create(newTitleGenre);
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
      await this.genresSearch.index(genre);

      const newGenreTranslation = new GenreTranslation({
        genreId: genre.id,
        languageCode: language.code,
        name: tmdbGenre.name,
      });

      const genreTranslation =
        await this.genreTranslationsRepository.create(newGenreTranslation);
      await this.genreTranslationsSearch.index(genreTranslation);
    }
  }
}
