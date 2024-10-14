import { Module } from '@nestjs/common';
import { LanguagesRepository } from './languages.repository';
import { PrismaLanguagesRepository } from './prisma.languages.repository';

@Module({
  providers: [
    {
      provide: LanguagesRepository,
      useClass: PrismaLanguagesRepository,
    },
  ],
  exports: [LanguagesRepository],
})
export class LanguagesModule {}
