import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUseCases } from '../../../use-cases/auth/auth.use-cases';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authUseCases: AuthUseCases) {
    super({
      usernameField: 'phone',
    });
  }

  async validate(phone: string, password: string): Promise<User> {
    const user = await this.authUseCases.validateUserCredentials(
      phone,
      password,
    );
    return user;
  }
}
