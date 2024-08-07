import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/users.module';
import { SecurityModule } from 'src/security/security.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, SecurityModule],
})
export class AuthModule {}
