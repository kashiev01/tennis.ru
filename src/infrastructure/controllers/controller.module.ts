import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { UseCaseModule } from '../../use-cases/use-case.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../configs/jwt-config.service';
import { ConfigsModule } from '../configs/configs.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigsModule],
      useClass: JwtConfig,
    }),
    UseCaseModule,
  ],
  controllers: [UserController, AuthController],
})
export class ControllerModule {}
