import { Module } from '@nestjs/common';
import { PrismaMediaTranslationsRepository } from './prisma.media-translations.repository';
import { MediaTranslationsRepository } from './media-translations.repository';
import { GenreTranslationsRepository } from './genre-translations.repository';
import { PrismaGenreTranslationsRepository } from './prisma.genre-translations.repository';

@Module({
  providers: [
    {
      provide: MediaTranslationsRepository,
      useClass: PrismaMediaTranslationsRepository,
    },
    {
      provide: GenreTranslationsRepository,
      useClass: PrismaGenreTranslationsRepository,
    },
  ],
  exports: [MediaTranslationsRepository, GenreTranslationsRepository],
})
export class TranslationsModule {}
