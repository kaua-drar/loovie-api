export class Movie {
  id: string;
  tmdbId: string;
  originalTitle: string;
  originalLanguage: string;
  releaseDate?: Date;
  posterPath: string;
  backdropPath: string;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
  mediaType: 'Movie' | 'Show' | 'Episode';

  constructor(
    attributes?: Omit<Movie, 'createdAt' | 'updatedAt' | 'id' | 'mediaType'>,
  ) {
    Object.assign(this, attributes);
  }
}
