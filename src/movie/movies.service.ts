import { BaseSearchParams } from 'src/search/base.search-params';
import { Injectable } from '@nestjs/common';
import { MovieTranslationsSearch } from 'src/translations/movie-translation.search';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieTranslationsSearch: MovieTranslationsSearch,
  ) {}

  async search({
    query,
    language,
    page,
    perPage,
    sortBy,
    sortDirection,
  }: BaseSearchParams) {
    return await this.movieTranslationsSearch.search({
      query,
      queryBy: 'name, overview',
      page,
      perPage,
      sortBy,
      sortDirection,
      filterBy: `language: ${language}`,
      includeFields: '$movies(*, strategy: merge)',
      excludeFields:
        'movieId, $movies(releaseDate, voteAverage, voteCount, popularity)',
    });
  }
}
