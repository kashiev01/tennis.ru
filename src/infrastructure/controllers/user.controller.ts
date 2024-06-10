import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserUseCases } from '../../use-cases';
import { CreateUserDto, UpdateUserDto } from './dtos/user-create.dto';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async getAll() {
    return await this.userUseCases.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Get(':id')
  async getById(@Param('id', IdValidationPipe) id: number) {
    return await this.userUseCases.getUserById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Put(':id')
  async updateAuthor(
    @Param('id', IdValidationPipe) userId: number,
    @Body() updateAuthorDto: UpdateUserDto,
  ) {
    return await this.userUseCases.updateUser(userId, updateAuthorDto);
  }
}
