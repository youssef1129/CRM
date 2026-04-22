import { Client } from '../../client/entities/client.entity';
import { Species } from '../../common/enums';
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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column('int')
  age!: number;

  @Column('decimal', { precision: 5, scale: 2 })
  height!: number;

  @Column('decimal', { precision: 5, scale: 2 })
  weight!: number;

  @Column({ type: 'enum', enum: Species })
  species!: Species;

  @ManyToOne(() => Client, (client) => client.animals, { onDelete: 'CASCADE' })
  client!: Client;

  @Column()
  clientId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
