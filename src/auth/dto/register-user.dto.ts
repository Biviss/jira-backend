import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({example: 'emale@mail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'adfowerngr'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({example: 'admin'})
  @IsEnum(['admin', 'developer', 'user'])
  @IsNotEmpty()
  role: string;
}