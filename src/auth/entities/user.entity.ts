import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'emale@mail.com'})
  @Column({ unique: true })
  email: string;

  @ApiProperty({example: 'adfowerngr'})
  @Column()
  password: string;

  @ApiProperty({example: 'admin'})
  @Column()
  role: string;
}