import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IChain } from '../interfaces/entities/chain.interface';

@Entity('chains')
export class ChainEntity extends BaseEntity implements IChain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
