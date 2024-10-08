import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './user';
import { UsersRepository } from './users.repository';
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prismaService: PrismaService,
  ) {}

  async create({
    email,
    username,
    firstName,
    lastName,
    birthday,
    password,
  }: User) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        username,
        firstName,
        birthday,
        lastName,
        password,
      },
    });

    return user;
  }

  async findBy(params: Partial<User>) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        OR: Object.entries(params).map(([key, value]) => ({
          [key]: value,
        })),
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }
}
