import { Global, Module } from '@nestjs/common';
import { TypesenseService } from './typesense.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: TypesenseService,
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('TYPESENSE_API_KEY');

        const client = new TypesenseService({
          apiKey,
          nodes: [
            {
              host: 'localhost',
              port: 8108,
              protocol: 'http',
            },
          ],
        });

        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [TypesenseService],
})
export class TypesenseModule {}
