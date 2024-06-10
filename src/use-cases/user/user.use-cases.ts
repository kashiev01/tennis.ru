import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreateUserDto,
  UpdateUserDto,
} from '../../infrastructure/controllers/dtos/user-create.dto';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { ExceptionService } from '../../infrastructure/exception/exception.service';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepo.findByCondition({
      email: createUserDto.phone,
    });

    if (user)
      this.exceptionService.badRequestException({
        message: 'Phone number is already registered',
        code_error: 400,
      });
    return await this.userRepo.create(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOneById(id);
    if (!user)
      this.exceptionService.NotFoundException({ message: 'User not found' });
    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userRepo.updateOneById(userId, updateUserDto);
  }

  async getUserBy(condition): Promise<User> {
    const user = await this.userRepo.findByCondition(condition);
    if (!user)
      this.exceptionService.NotFoundException({ message: 'User not found' });

    return user;
  }
}
