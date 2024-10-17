import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { ProductionTranslationsRepository } from './production-translations.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { ProductionTranslation } from './production-translation';

export class PrismaProductionTranslationsRepository
  implements ProductionTranslationsRepository
{
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async create({
    languageCode,
    name,
    overview,
    productionId,
    posterPath,
  }: ProductionTranslation) {
    const productionTranslation =
      await this.prismaService.productionTranslation.create({
        data: {
          languageCode,
          productionId,
          name,
          overview,
          posterPath,
        },
      });

    return productionTranslation;
  }

  async findBy(params: Partial<ProductionTranslation>) {
    const productionTranslation =
      await this.prismaService.productionTranslation.findFirstOrThrow({
        where: {
          OR: Object.entries(params).map(([key, value]) => ({
            [key]: value,
          })),
        },
      });

    return productionTranslation;
  }

  async findAll(): Promise<ProductionTranslation[]> {
    const productionTranslations =
      await this.prismaService.productionTranslation.findMany();

    return productionTranslations;
  }
}
