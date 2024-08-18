import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export class JwtConfigService implements JwtModuleAsyncOptions {
  global = true;
  imports = [ConfigModule];
  async useFactory(configService: ConfigService) {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    };
  }
  inject = [ConfigService];
}
