import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { MediaGenresRepository } from './media-genres.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { MediaGenre } from './media-genre';

export class PrismaMediaGenresRepository implements MediaGenresRepository {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async create({ genreId, mediaId }: MediaGenre): Promise<MediaGenre> {
    const mediaGenre = await this.prismaService.mediaGenre.create({
      data: {
        genreId,
        mediaId,
      },
    });

    return mediaGenre;
  }
}
