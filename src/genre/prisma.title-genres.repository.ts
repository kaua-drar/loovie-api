import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { TitleGenresRepository } from './title-genres.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { TitleGenre } from './title-genre';

export class PrismaTitleGenresRepository implements TitleGenresRepository {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async create({ genreId, titleId }: TitleGenre): Promise<TitleGenre> {
    const titleGenre = await this.prismaService.titleGenre.create({
      data: {
        genreId,
        titleId,
      },
    });

    return titleGenre;
  }
}
