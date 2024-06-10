import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { IJwtPayload } from '../../../domain/adapters/jwt.interface';
import { JwtConfig } from '../../configs/jwt-config.service';
import { UserUseCases } from '../../../use-cases';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    jwtConfig: JwtConfig,
    private readonly userUserCases: UserUseCases,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    return await this.userUserCases.getUserById(payload.id);
  }
}
