import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

class LoginResponseDto {
  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWxlQG1haWwuY29tIiwic3ViIjoyLCJpYXQiOjE3Mjg4MjI3ODQsImV4cCI6MTcyODkwOTE4NH0.WfVdFEQT-p4tPHMZMaHfvmWk1vPKfBPn7_UXOUM7tTg'})
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Registration users'})
  @ApiResponse({type: User})
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({summary: 'Log in users'})
  @ApiResponse({type: LoginResponseDto})
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
}