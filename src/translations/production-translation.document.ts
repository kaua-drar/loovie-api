export interface ProductionTranslationDocument {
  id: string;
  language: string;
  name: string;
  overview?: string;
  posterPath?: string;
  createdAt: number;
  updatedAt: number;
  releaseDate?: number;
  voteAverage?: number;
  voteCount?: number;
  popularity?: number;
}
