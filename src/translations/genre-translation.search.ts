import { BaseSearch } from 'src/search/base.search';
import { GenreTranslation } from './genre-translation';
import { GenreTranslationDocument } from './genre-translation.document';

export abstract class GenreTranslationsSearch extends BaseSearch<
  GenreTranslation,
  GenreTranslationDocument
> {}
