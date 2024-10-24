import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async login(dto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['tasks', 'projectsCreator', 'projectsExrcutor'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where: { id }, relations: ['tasks', 'projectsCreator', 'projectsExrcutor']});
    return user;
  }
}
