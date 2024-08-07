import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PrismaUsersRepository } from './prisma.users.repository';

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
