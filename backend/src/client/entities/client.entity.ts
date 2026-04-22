import { Animal } from '../../animal/entities/animal.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Civility } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ enum: Civility })
  @Column({ type: 'enum', enum: Civility })
  civility!: Civility;

  @ApiProperty({ example: 'Jean' })
  @Column()
  firstName!: string;

  @ApiProperty({ example: 'Dupont' })
  @Column()
  lastName!: string;

  @ApiProperty({ example: 'jean.dupont@email.com' })
  @Column({ unique: true })
  email!: string;

  @ApiProperty({ example: '0612345678' })
  @Column()
  phone!: string;

  @ApiProperty({ type: () => [Animal], required: false })
  @OneToMany(() => Animal, (animal) => animal.client)
  animals?: Animal[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
