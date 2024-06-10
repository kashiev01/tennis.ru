import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma-config.service';
import { JwtConfig } from './jwt-config.service';
import { JwtModule } from '@nestjs/jwt';
import * as NestConfig from '@nestjs/config';
import { AeroConfigService } from './aero-config.service';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    AppConfigService,
    EnvironmentConfigService,
    ConfigService,
    PrismaService,
    JwtConfig,
    AeroConfigService,
  ],
  exports: [EnvironmentConfigService],
})
export class ConfigsModule {}
