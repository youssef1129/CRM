import { Client } from '../../client/entities/client.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Species } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Animal {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Médor' })
  @Column()
  firstName!: string;

  @ApiProperty({ example: 5 })
  @Column('int')
  age!: number;

  @ApiProperty({ example: 45.5 })
  @Column('decimal', { precision: 5, scale: 2 })
  height!: number;

  @ApiProperty({ example: 12.2 })
  @Column('decimal', { precision: 5, scale: 2 })
  weight!: number;

  @ApiProperty({ enum: Species })
  @Column({ type: 'enum', enum: Species })
  species!: Species;

  @ApiProperty({ type: () => Client })
  @ManyToOne(() => Client, (client) => client.animals, { onDelete: 'CASCADE' })
  client!: Client;

  @ApiProperty({ example: 1 })
  @Column()
  clientId!: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
