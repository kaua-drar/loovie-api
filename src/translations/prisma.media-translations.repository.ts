import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { MediaTranslationsRepository } from './media-translations.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { MediaTranslation } from './media-translation';

export class PrismaMediaTranslationsRepository
  implements MediaTranslationsRepository
{
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async create({ languageCode, title, overview, mediaId }: MediaTranslation) {
    const mediaTranslation = await this.prismaService.mediaTranslation.create({
      data: {
        languageCode,
        title,
        overview,
        mediaId,
      },
    });

    return mediaTranslation;
  }

  async findBy(params: Partial<MediaTranslation>) {
    const mediaTranslation =
      await this.prismaService.mediaTranslation.findFirstOrThrow({
        where: {
          OR: Object.entries(params).map(([key, value]) => ({
            [key]: value,
          })),
        },
      });

    return mediaTranslation;
  }
}
