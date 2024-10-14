import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ClsModule, ClsService } from 'nestjs-cls';
import { ZenStackModule } from '@zenstackhq/server/nestjs';
import { PrismaService } from './database/prisma.service';
import { enhance } from '@zenstackhq/runtime';
import { PrismaModule } from './database/prisma.module';
import { LanguagesModule } from './language/languages.module';
import { MoviesModule } from './movie/movies.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { TranslationsModule } from './translations/translations.module';
import { GenresModule } from './genre/genres.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    {
      global: true,
      module: PrismaModule,
    },
    UsersModule,
    AuthModule,
    SecurityModule,
    ZenStackModule.registerAsync({
      global: true,
      useFactory: async (
        prisma: PrismaService,
        cls: ClsService,
        configService: ConfigService,
      ) => {
        let user: { id: string };

        if (process.env.NODE_ENV === 'debug') {
          user = await prisma.user.findUnique({
            where: {
              username: configService.get('ROOT_USERNAME'),
            },
          });
        } else {
          user = cls.get('auth');
        }

        return {
          getEnhancedPrisma: () => enhance(prisma, { user }),
        };
      },
      inject: [PrismaService, ClsService, ConfigService],
      extraProviders: [PrismaService, ConfigService],
    }),
    LanguagesModule,
    MoviesModule,
    GenresModule,
    TmdbModule,
    TranslationsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
