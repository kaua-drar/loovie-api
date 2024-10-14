import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { MoviesRepository } from './movies.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { Movie } from './movie';

export class PrismaMoviesRepository implements MoviesRepository {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async create({
    tmdbId,
    duration,
    backdropPath,
    originalLanguage,
    originalTitle,
    posterPath,
    releaseDate,
  }: Movie) {
    const movie = await this.prismaService.movie.create({
      data: {
        tmdbId,
        duration,
        backdropPath,
        originalLanguage,
        originalTitle,
        posterPath,
        releaseDate,
      },
    });

    return movie;
  }

  async findBy(params: Partial<Movie>) {
    const movie = await this.prismaService.movie.findFirstOrThrow({
      where: {
        OR: Object.entries(params).map(([key, value]) => ({
          [key]: value,
        })),
      },
    });

    return movie;
  }

  async exists(params: Partial<Movie>): Promise<boolean> {
    const movie = await this.prismaService.movie.findFirst({
      where: {
        OR: Object.entries(params).map(([key, value]) => ({
          [key]: value,
        })),
      },
    });

    return !!movie;
  }
}
