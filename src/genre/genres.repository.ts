import { Genre } from './genre';

export abstract class GenresRepository {
  abstract create(params: Genre): Promise<Genre>;

  abstract findBy(params: Partial<Genre>): Promise<Genre>;

  abstract findOrCreate(params: Pick<Genre, 'tmdbId'>): Promise<Genre>;

  abstract exists(params: Partial<Genre>): Promise<boolean>;

  abstract findAll(): Promise<Genre[]>;
}
