import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { LanguagesRepository } from './languages.repository';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@zenstackhq/runtime';
import { Language } from './language';
import { Required } from 'utility-types';

export class PrismaLanguagesRepository implements LanguagesRepository {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaClient,
  ) {}

  async findBy(params: Partial<Language>) {
    const language = await this.prismaService.language.findFirstOrThrow({
      where: {
        OR: Object.entries(params).map(([key, value]) => ({
          [key]: value,
        })),
      },
    });

    return language;
  }

  async findOrCreate(params: Required<Partial<Language>, 'code'>) {
    const language = await this.prismaService.language.upsert({
      where: {
        code: params.code,
      },
      update: {},
      create: params,
    });

    return language;
  }
}
