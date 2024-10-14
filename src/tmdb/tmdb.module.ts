import { Module } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { LanguagesModule } from 'src/language/languages.module';
import { MoviesModule } from 'src/movie/movies.module';
import { TranslationsModule } from 'src/translations/translations.module';
import { GenresModule } from 'src/genre/genres.module';
import { UsersModule } from 'src/user/users.module';
import { ZenStackModule } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/database/prisma.service';
import { enhance } from '@zenstackhq/runtime';

@Module({
  imports: [
    ZenStackModule.registerAsync({
      useFactory: async (prisma: PrismaService) => {
        const user = await prisma.user.findUnique({
          where: {
            username: 'kauadrar',
          },
        });

        return {
          getEnhancedPrisma: () => enhance(prisma, { user }),
        };
      },
      inject: [PrismaService],
      extraProviders: [PrismaService],
    }),
    UsersModule,
    LanguagesModule,
    MoviesModule,
    TranslationsModule,
    GenresModule,
  ],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
