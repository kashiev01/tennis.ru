import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaBaseRepository } from './base.repository';
import { PrismaService } from '../configs/prisma-config.service';

@Injectable()
export class UserRepository extends PrismaBaseRepository<User> {
  constructor(prismaClient: PrismaService) {
    super(prismaClient.user);
  }
}
