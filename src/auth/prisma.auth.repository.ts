import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthRepository } from 'src/auth/auth.repository';
import { User } from 'src/user/user';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private prismaService: PrismaService) {}

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
}
