import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Project1'})
  @Column()
  title: string;

  @ApiProperty({example: 'This is Project1'})
  @Column()
  description: string;

  @ApiProperty({example: ['user1@mail.com','user2@mail.com']})
  @Column("text", { array: true })
  participants: string[];

  @ApiProperty({example: ['Task1','Task2']})
  @Column("text", { array: true })
  tasksTitles: string[];
}