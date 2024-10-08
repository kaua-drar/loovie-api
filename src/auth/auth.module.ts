import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/users.module';
import { SecurityModule } from 'src/security/security.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtConfigService } from 'src/security/jwt-config.service';
import { AuthRepository } from './auth.repository';
import { PrismaAuthRepository } from './prisma.auth.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
  ],
  imports: [
    UsersModule,
    SecurityModule,
    JwtModule.registerAsync(new JwtConfigService()),
  ],
})
export class AuthModule {}
