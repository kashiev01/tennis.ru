import { Module } from '@nestjs/common';
import { UserUseCases } from './user/user.use-cases';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { PrismaService } from '../infrastructure/configs/prisma-config.service';
import { AuthUseCases } from './auth/auth.use-cases';
import { ExceptionService } from '../infrastructure/exception/exception.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../infrastructure/common/strategies/local.strategy';
import { AeroConfigService } from '../infrastructure/configs/aero-config.service';
import { ConfigsModule } from '../infrastructure/configs/configs.module';
import { EnvironmentConfigService } from '../infrastructure/configs/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { AeroUseCases } from './aero/aero.use-cases';

@Module({
  providers: [
    UserUseCases,
    UserRepository,
    PrismaService,
    AuthUseCases,
    ExceptionService,
    JwtService,
    LocalStrategy,
    AeroConfigService,
    EnvironmentConfigService,
    ConfigService,
    AeroUseCases,
  ],
  exports: [UserUseCases, AuthUseCases],
})
export class UseCaseModule {}
