import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/users.module';
import { SecurityModule } from 'src/security/security.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const jwtSecret = configService.get('JWT_SECRET');

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    SecurityModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
