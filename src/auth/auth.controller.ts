import { Controller, Post, Body,Get, Query, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('auth')
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
  @ApiResponse({schema: {
    example: {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWxlQG1haWwuY29tIiwic3ViIjoyLCJpYXQiOjE3MjkwMTc0ODksImV4cCI6MTcyOTEwMzg4OX0.EMPa8CUqfx2juUJLg5F7XM3jw5wfbYQqFq__5u0MEY8"
    },
  }})
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Get verify-user' })
  @ApiResponse({ type: User })
  @Get('verify_user')
  async verifyUser(@Query('token') token: string){
    return this.authService.verify_user(token);
  }
}