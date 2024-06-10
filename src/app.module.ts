import { Module } from '@nestjs/common';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionModule } from './infrastructure/exception/exception.module';
import { ControllerModule } from './infrastructure/controllers/controller.module';
import { UseCaseModule } from './use-cases/use-case.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ConfigsModule } from './infrastructure/configs/configs.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    LoggerModule,
    ControllerModule,
    UseCaseModule,
    ExceptionModule,
    RepositoriesModule,
    ConfigsModule,
  ],
})
export class AppModule {}
