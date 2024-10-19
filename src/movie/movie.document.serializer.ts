import { Expose, Transform } from 'class-transformer';
import { MovieDocument } from './movie.document';

export class MovieDocumentSerializer {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'tmdbId' })
  tmdbId: string;

  @Expose({ name: 'name' })
  name?: string;

  @Expose({ name: 'language' })
  language?: string;

  @Expose({ name: 'overview' })
  overview?: string;

  @Expose({ name: 'originalName' })
  originalName: string;

  @Expose({ name: 'originalLanguage' })
  originalLanguage: string;

  @Expose({ name: 'releaseDate' })
  @Transform(({ value }) => (value ? new Date(value) : value))
  releaseDate?: number;

  @Expose({ name: 'posterPath' })
  posterPath?: string;

  @Expose({ name: 'backdropPath' })
  backdropPath?: string;

  @Expose({ name: 'duration' })
  duration?: number;

  @Expose({ name: 'adult' })
  adult: boolean;

  @Expose({ name: 'popularity' })
  popularity?: number;

  @Expose({ name: 'titleType' })
  titleType: string;

  @Expose({ name: 'voteAverage' })
  voteAverage?: number;

  @Expose({ name: 'voteCount' })
  voteCount?: number;

  @Expose({ name: 'createdAt' })
  @Transform(({ value }) => new Date(value))
  createdAt: number;

  @Expose({ name: 'updatedAt' })
  @Transform(({ value }) => new Date(value))
  updatedAt: number;

  constructor(attributes: MovieDocument) {
    Object.assign(this, attributes);
  }
}
