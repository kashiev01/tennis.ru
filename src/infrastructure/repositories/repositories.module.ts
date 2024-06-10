import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from '../configs/prisma-config.service';

@Module({
  providers: [PrismaService, UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}
