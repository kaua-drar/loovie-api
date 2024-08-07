import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpBodyDto } from './dtos/sign-up-body.dto';
import { UserSerializer } from 'src/user/user.serializer';
import { LoginDto } from './dtos/login.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('sign_up')
  async signUp(@Body() body: SignUpBodyDto) {
    const {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password,
    } = body;

    const user = await this.authService.signUp({
      email,
      username,
      firstName,
      lastName,
      password,
    });

    const data = new UserSerializer(user);

    return data;
  }

  @HttpCode(201)
  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, username, password } = body;

    const user = await this.authService.login({
      email,
      username,
      password,
    });

    const data = new UserSerializer(user);

    return data;
  }
}
