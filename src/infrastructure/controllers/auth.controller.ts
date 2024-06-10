import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthUseCases } from '../../use-cases/auth/auth.use-cases';
import { CreateUserDto, LoginDto, ResetPasswordDto } from './dtos';
import { User } from '@prisma/client';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IJwtResponse } from '../../domain/adapters/jwt.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: AuthUseCases) {}

  @ApiOperation({ summary: 'User signup' })
  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto): Promise<User> {
    return await this.authUseCases.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ description: 'User credentials', type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: any): IJwtResponse {
    return this.authUseCases.login(req.user);
  }

  @ApiOperation({ summary: 'Reset password' })
  @Post('password/reset')
  async confirmCode(@Body() resetDto: ResetPasswordDto) {
    return await this.authUseCases.resetPassword(resetDto);
  }
}
