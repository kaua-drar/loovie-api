import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from 'typesense';

@Injectable()
export class TypesenseService extends Client implements OnModuleInit {
  async onModuleInit() {
    await this.health
      .retrieve()
      .then((rs) => {
        Logger.log(`Typesense health check: ${rs.ok}`);
      })
      .catch((err) => {
        Logger.error(`Typesense: ${err.errors}`);
      });
  }
}
