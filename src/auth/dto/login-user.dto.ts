import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({example: 'emale@mail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'adfowerngr'})
  @IsString()
  @IsNotEmpty()
  password: string;
}
