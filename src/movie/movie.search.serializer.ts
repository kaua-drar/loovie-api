import { BaseSearchResponse } from 'src/search/base.search-response';
import { MovieDocument } from './movie.document';
import { Expose, Type } from 'class-transformer';
import { MovieDocumentSerializer } from './movie.document.serializer';

export class MovieSearchResponseSerializer {
  @Expose({ name: 'perPage' })
  perPage: number;

  @Expose({ name: 'page' })
  page: number;

  @Expose({ name: 'results' })
  @Type(() => MovieDocumentSerializer)
  results: MovieDocument[];

  constructor(attributes: BaseSearchResponse<MovieDocument>) {
    Object.assign(this, attributes);
  }
}
