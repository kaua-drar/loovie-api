import { ProductionTranslation } from './production-translation';

export abstract class ProductionTranslationsRepository {
  abstract create(
    params: ProductionTranslation,
  ): Promise<ProductionTranslation>;

  abstract findBy(
    params: Partial<ProductionTranslation>,
  ): Promise<ProductionTranslation>;

  abstract findAll(): Promise<ProductionTranslation[]>;
}
