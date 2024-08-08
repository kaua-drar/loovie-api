import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PrismaUsersRepository } from './prisma.users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
