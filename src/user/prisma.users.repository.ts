import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './user';
import { UsersRepository } from './users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create({
    email,
    username,
    firstName,
    lastName,
    birthDate,
    password,
  }: User) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        username,
        firstName,
        birthDate,
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
