export class ProductionTranslation {
  id: string;
  languageCode: string;
  productionId: string;
  name: string;
  overview: string;
  posterPath?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    attributes?: Omit<ProductionTranslation, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    Object.assign(this, attributes);
  }
}
