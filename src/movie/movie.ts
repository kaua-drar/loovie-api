export class Movie {
  id: string;
  tmdbId: string;
  originalName: string;
  originalLanguage: string;
  releaseDate?: Date;
  backdropPath: string;
  duration?: number;
  voteAverage: number;
  voteCount: number;
  adult: boolean;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
  titleType: 'Movie' | 'Show';

  constructor(
    attributes?: Omit<Movie, 'createdAt' | 'updatedAt' | 'id' | 'titleType'>,
  ) {
    Object.assign(this, attributes);
  }
}
