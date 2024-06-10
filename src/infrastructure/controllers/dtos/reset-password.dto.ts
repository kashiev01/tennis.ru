import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
