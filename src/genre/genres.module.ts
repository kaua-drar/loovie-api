import { Module } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { PrismaGenresRepository } from './prisma.genres.repository';
import { TitleGenresRepository } from './title-genres.repository';
import { PrismaTitleGenresRepository } from './prisma.title-genres.repository';
import { GenresController } from './genres.controller';
import { GenresSearch } from './genres.search';
import { TypesenseGenresSearch } from './typesense.genres.search';

@Module({
  controllers: [GenresController],
  providers: [
    {
      provide: GenresRepository,
      useClass: PrismaGenresRepository,
    },
    {
      provide: TitleGenresRepository,
      useClass: PrismaTitleGenresRepository,
    },
    {
      provide: GenresSearch,
      useClass: TypesenseGenresSearch,
    },
  ],
  exports: [GenresRepository, TitleGenresRepository, GenresSearch],
})
export class GenresModule {}
