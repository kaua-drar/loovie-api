import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [UsersModule, AuthModule, SecurityModule, PrismaModule],
})
export class AppModule {}
