import { Movie } from './movie';

export abstract class MoviesRepository {
  abstract create(params: Movie): Promise<Movie>;

  abstract findBy(params: Partial<Movie>): Promise<Movie>;

  abstract exists(params: Partial<Movie>): Promise<boolean>;
}
