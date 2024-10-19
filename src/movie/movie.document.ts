export interface MovieDocument {
  id: string;
  tmdbId: string;
  name?: string;
  language?: string;
  overview?: string;
  originalName: string;
  originalLanguage: string;
  releaseDate?: number;
  posterPath?: string;
  backdropPath?: string;
  duration?: number;
  adult: boolean;
  popularity?: number;
  titleType: string;
  voteAverage?: number;
  voteCount?: number;
  createdAt: number;
  updatedAt: number;
}
