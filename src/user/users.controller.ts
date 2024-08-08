import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSerializer } from './user.serializer';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: UserSerializer })
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users;
  }
}
