import { Injectable } from '@nestjs/common';

import { EnvironmentConfigService } from './environment-config.service';
import { IAeroConfigOptions } from '../../domain/adapters/aero.interface';

@Injectable()
export class AeroConfigService {
  baseUrl: string;
  login: string;
  apiKey: string;
  constructor(configService: EnvironmentConfigService) {
    this.baseUrl = configService.getString('SMS_AERO_BASE_URL');
    this.login = configService.getString('SMS_AERO_LOGIN');
    this.apiKey = configService.getString('SMS_AERO_API_KEY');
  }

  aeroConfigOptions(): IAeroConfigOptions {
    return {
      baseUrl: this.baseUrl,
      login: this.login,
      apiKey: this.apiKey,
    };
  }
}
