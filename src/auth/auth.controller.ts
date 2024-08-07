import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpBodyDto } from './dtos/sign-up-body.dto';
import { UserSerializer } from 'src/user/user.serializer';
import { LoginDto } from './dtos/login.dto';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('sign_up')
  async signUp(@Body() body: SignUpBodyDto, @Res() res: Response) {
    const {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password,
    } = body;

    const { user, token } = await this.authService.signUp({
      email,
      username,
      firstName,
      lastName,
      password,
    });

    const data = instanceToPlain(new UserSerializer(user));

    return res.set('Authorization', `Bearer ${token}`).json(data);
  }

  @HttpCode(201)
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { email, username, password } = body;

    const { user, token } = await this.authService.login({
      email,
      username,
      password,
    });

    const data = instanceToPlain(new UserSerializer(user));

    return res.set('Authorization', `Bearer ${token}`).json(data);
  }
}
