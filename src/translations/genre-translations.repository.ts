import { GenreTranslation } from './genre-translation';

export abstract class GenreTranslationsRepository {
  abstract create(params: GenreTranslation): Promise<GenreTranslation>;

  abstract findBy(params: Partial<GenreTranslation>): Promise<GenreTranslation>;

  abstract findAll(): Promise<GenreTranslation[]>;
}
