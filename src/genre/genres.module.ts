import { Module } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { PrismaGenresRepository } from './prisma.genres.repository';
import { MediaGenresRepository } from './media-genres.repository';
import { PrismaMediaGenresRepository } from './prisma.media-genres.repository';
import { GenresController } from './genres.controller';

@Module({
  controllers: [GenresController],
  providers: [
    {
      provide: GenresRepository,
      useClass: PrismaGenresRepository,
    },
    {
      provide: MediaGenresRepository,
      useClass: PrismaMediaGenresRepository,
    },
  ],
  exports: [GenresRepository, MediaGenresRepository],
})
export class GenresModule {}
