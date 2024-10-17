import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { GenresRepository } from './genres.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { Genre } from './genre';

export class PrismaGenresRepository implements GenresRepository {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async create({ tmdbId }: Genre): Promise<Genre> {
    const genre = await this.prismaService.genre.create({
      data: {
        tmdbId,
      },
    });

    return genre;
  }

  async findBy(params: Partial<Genre>): Promise<Genre> {
    const genre = await this.prismaService.genre.findFirstOrThrow({
      where: {
        OR: Object.entries(params).map(([key, value]) => ({
          [key]: value,
        })),
      },
    });

    return genre;
  }

  async findOrCreate(params: Pick<Genre, 'tmdbId'>): Promise<Genre> {
    const genre = await this.prismaService.genre.upsert({
      where: {
        tmdbId: params.tmdbId,
      },
      update: {},
      create: params,
    });

    return genre;
  }

  async exists(params: Partial<Genre>): Promise<boolean> {
    const genre = await this.prismaService.genre.findFirst({
      where: {
        OR: Object.entries(params).map(([key, value]) => ({
          [key]: value,
        })),
      },
    });

    return !!genre;
  }

  async findAll(): Promise<Genre[]> {
    const genres = await this.prismaService.genre.findMany();

    return genres;
  }
}
