import { BaseSearch } from 'src/search/base.search';
import { Genre } from './genre';
import { GenreDocument } from 'src/translations/genre.document';

export abstract class GenresSearch extends BaseSearch<Genre, GenreDocument> {}
