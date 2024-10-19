export interface ProductionTranslationIndexDto {
  id: string;
  languageCode: string;
  productionId: string;
  name: string;
  overview: string;
  posterPath?: string;
  createdAt: Date;
  updatedAt: Date;
  releaseDate?: Date;
  voteAverage?: number;
  voteCount?: number;
  popularity?: number;
}
