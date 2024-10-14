import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Task1'})
  @Column()
  title: string;

  @ApiProperty({example: 'This is the Task1'})
  @Column()
  description: string;

  @ApiProperty({example: 'In Progress'})
  @Column()
  status: string;

  @ApiProperty({example: 'Task'})
  @Column()
  type: string;

  @ApiProperty({example: 'user1@mail.com'})
  @Column()
  executor: string;

  @ApiProperty({example: '2024-10-15'})
  @Column()
  deadline: Date;

  @ApiProperty({example: 'Medium'})
  @Column()
  priority: string;
}
