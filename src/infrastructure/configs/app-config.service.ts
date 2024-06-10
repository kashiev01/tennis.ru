import { Injectable } from '@nestjs/common';

import { EnvironmentConfigService } from './environment-config.service';

@Injectable()
export class AppConfigService {
  public readonly name: string;
  public readonly port: number;
  public readonly isProduction: boolean;

  constructor(configService: EnvironmentConfigService) {
    this.name = configService.getString('APP_NAME');
    this.port = configService.getNumber('APP_PORT');
    this.isProduction = configService.getBoolean('APP_PRODUCTION');
  }

  public get now(): Date {
    return new Date();
  }
}
