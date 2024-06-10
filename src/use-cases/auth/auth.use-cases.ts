import { Injectable } from '@nestjs/common';

import { ExceptionService } from '../../infrastructure/exception/exception.service';
import {
  CreateUserDto,
  ResetPasswordDto,
} from '../../infrastructure/controllers/dtos';
import { UserUseCases } from '../user/user.use-cases';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { IJwtPayload, IJwtResponse } from '../../domain/adapters/jwt.interface';
import { genSalt } from 'bcrypt';
import { compareHash, genHash } from '../../infrastructure/utils/utils';
import { AeroUseCases } from '../aero/aero.use-cases';

@Injectable()
export class AuthUseCases {
  constructor(
    private readonly exceptionService: ExceptionService,
    private readonly userUseCases: UserUseCases,
    private readonly jwtService: JwtService,
    private readonly aerouseCases: AeroUseCases,
  ) {}

  async signUp(dto: CreateUserDto): Promise<User> {
    const { password, phone } = dto;
    const salt = await genSalt();
    dto.password = await genHash(password, salt);

    const user = await this.userUseCases.createUser(dto);

    return user;
  }

  login(user: User): IJwtResponse {
    const { phone, id } = user;
    const payload: IJwtPayload = {
      phone,
      id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserCredentials(phone: string, password: string) {
    const user = await this.userUseCases.getUserBy({ phone });
    const checkPassword = await compareHash(password, user.password);
    if (!checkPassword)
      this.exceptionService.unauthorizedException({
        message: 'Invalid credentials',
      });

    return user;
  }

  async resetPassword(resetDto: ResetPasswordDto) {
    const { phone } = resetDto;
    const user = await this.userUseCases.getUserBy({ phone });

    const confirmationCode: number = Math.floor(1000 + Math.random() * 9000);
    await this.aerouseCases.sendResetCode(phone, confirmationCode);
  }
}
