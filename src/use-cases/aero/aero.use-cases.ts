import { Injectable } from '@nestjs/common';
import { compareHash, genHash } from '../../infrastructure/utils/utils';
import axios from 'axios';
import { AeroConfigService } from '../../infrastructure/configs/aero-config.service';
import { ExceptionService } from '../../infrastructure/exception/exception.service';

@Injectable()
export class AeroUseCases {
  private baseUrl: string;
  private login: string;
  private apiKey: string;
  constructor(
    private readonly aeroConfigService: AeroConfigService,
    private readonly exceptionService: ExceptionService,
  ) {
    const config = this.aeroConfigService.aeroConfigOptions();
    this.baseUrl = config.baseUrl;
    this.login = config.login;
    this.apiKey = config.apiKey;
  }
  async sendResetCode(phoneNumber: string, code: number) {
    const sanitizedNumber = this.sanitizePhoneNumber(phoneNumber);
    const url = new URL(
      `https://${this.login}:${this.apiKey}@${this.baseUrl}/sms/send`,
    );
    const data = {
      number: sanitizedNumber,
      text: `Ваш код подтверждения: ${code}`,
      sign: 'SMS Aero',
    };

    try {
      const response = await axios.post(url.toString(), data, {
        auth: {
          username: this.login,
          password: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      this.exceptionService.badRequestException({
        message: `Failed to deliver SMS code to user ${phoneNumber}`,
        code_error: 404,
      });
    }
  }

  private sanitizePhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/\D/g, '');
  }
}
