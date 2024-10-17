import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { GenreTranslationsRepository } from './genre-translations.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { GenreTranslation } from './genre-translation';

export class PrismaGenreTranslationsRepository
  implements GenreTranslationsRepository
{
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async create({ languageCode, genreId, name }: GenreTranslation) {
    const genreTranslation = await this.prismaService.genreTranslation.create({
      data: { languageCode, genreId, name },
    });

    return genreTranslation;
  }

  async findBy(params: Partial<GenreTranslation>) {
    const genreTranslation =
      await this.prismaService.genreTranslation.findFirstOrThrow({
        where: {
          OR: Object.entries(params).map(([key, value]) => ({
            [key]: value,
          })),
        },
      });

    return genreTranslation;
  }

  async findAll(): Promise<GenreTranslation[]> {
    const genreTranslations =
      await this.prismaService.genreTranslation.findMany();

    return genreTranslations;
  }
}
