import {
  Column,
  Entity,
} from 'typeorm';
import { ICoin } from '../interfaces/entities/coin.interface';
import { BaseEntity } from 'src/shared/configurations/database/base-entity';

@Entity('coins')
export class CoinEntity extends BaseEntity implements ICoin {
  @Column({ type: 'bigint', nullable: true })
  chainId: number;

  @Column({ type: 'varchar', nullable: true })
  pairKey: string;

  @Column({ type: 'varchar', nullable: true })
  mintKey: string;

  @Column({ type: 'varchar' })
  mintName: string;

  @Column({ type: 'varchar', nullable: true })
  mintSymbol: string;

  @Column({ type: 'varchar', nullable: true })
  quoteKey: string;

  @Column({ type: 'varchar', nullable: true })
  quoteSymbol: string;

  @Column({ type: 'varchar' })
  quoteName: string;

  @Column({ type: 'timestamp', nullable: true })
  detectedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  marketMaker: string;
}
