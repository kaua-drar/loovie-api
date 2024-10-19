import { BaseSearch } from 'src/search/base.search';
import { Movie } from './movie';
import { MovieDocument } from './movie.document';

export abstract class MoviesSearch extends BaseSearch<Movie, MovieDocument> {}
