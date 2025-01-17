import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from 'src/shared/configurations/database/base-entity';
import { ICoinHistoryRecord } from '../interfaces/entities/coin-history-record.interface';

@Entity('coin_history_records')
export class CoinHistoryRecordEntity extends BaseEntity implements ICoinHistoryRecord {
  @Column({ type: 'bigint', nullable: true })
  coinId: number;

  // Market Capitalization
  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  marketCap: number;

  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  fdv: number;

  @Column({ type: 'decimal', precision: 30, scale: 15, nullable: true })
  priceNative: number;

  // Coin Price
  @Column({ type: 'decimal', precision: 30, scale: 15, nullable: true })
  priceUsd: number;

  @Column({ type: 'int', nullable: true })
  buysTxnsM5: number;

  @Column({ type: 'int', nullable: true })
  buysTxnsH1: number;

  @Column({ type: 'int', nullable: true })
  buysTxnsH6: number;

  @Column({ type: 'int', nullable: true })
  buysTxnsH24: number;

  @Column({ type: 'int', nullable: true })
  sellsTxnsM5: number;

  @Column({ type: 'int', nullable: true })
  sellsTxnsH1: number;

  @Column({ type: 'int', nullable: true })
  sellsTxnsH6: number;

  @Column({ type: 'int', nullable: true })
  sellsTxnsH24: number;

  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  volumeM5: number;

  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  volumeH1: number;

  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  volumeH6: number;

  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  volumeH24: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  priceChangeM5: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  priceChangeH1: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  priceChangeH6: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  priceChangeH24: number;

  // Liquidity Pool Size
  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  liquidityUsd: number;

  // Take part in computing Liquidity Pool Ratio Check as a base token (native token)
  @Column({ type: 'decimal', precision: 30, scale: 15, nullable: true })
  liquidityBase: number;

  // Take part in computing Liquidity Pool Ratio Check as a quote token (stablecoin)
  @Column({ type: 'decimal', precision: 20, scale: 10, nullable: true })
  liquidityQuote: number;
}
