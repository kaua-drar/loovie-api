import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpBodyDto } from './dtos/sign-up-body.dto';
import { UserSerializer } from 'src/user/user.serializer';
import { LoginDto } from './dtos/login.dto';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { Public } from './decorators/auth.public.decorator';
import { AuthRequest } from './auth.request';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(201)
  @Post('sign_up')
  async signUp(@Body() body: SignUpBodyDto, @Res() res: Response) {
    const {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      birthday,
      password,
    } = body;

    const { user, token } = await this.authService.signUp({
      email,
      username,
      firstName,
      lastName,
      birthday,
      password,
    });

    const data = instanceToPlain(new UserSerializer(user));

    return res.set('Access-Token', token).json(data);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { email, username, password } = body;

    const { user, token } = await this.authService.login({
      email,
      username,
      password,
    });

    const data = instanceToPlain(new UserSerializer(user));

    return res.set('Access-Token', token).json(data);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async me(@Req() req: AuthRequest) {
    const { user } = req;

    return new UserSerializer(user);
  }
}
