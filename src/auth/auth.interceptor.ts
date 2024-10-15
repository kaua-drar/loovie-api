import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly clsService: ClsService,
    private readonly prismaService: PrismaService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;

    if (userId) {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      request.user = user;

      this.clsService.set('auth', user);
    }
    return next.handle();
  }
}
