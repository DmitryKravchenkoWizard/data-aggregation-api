import {
    Column,
    Entity,
} from 'typeorm';
import { BaseEntity } from 'src/shared/configurations/database/base-entity';
import { ICoinInfo } from '../interfaces/entities/coin-info.interface';

@Entity('coin_infos')
export class CoinInfoEntity extends BaseEntity implements ICoinInfo {
    @Column({ type: 'bigint', nullable: true })
    coinId: number;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @Column({ type: 'varchar', nullable: true })
    imageUrl: string;

    @Column({ type: 'varchar', nullable: true })
    header: string;

    @Column({ type: 'varchar', nullable: true })
    openGraph: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    websites: string;
    
    @Column({ type: 'varchar', nullable: true })
    twitter: string;

    @Column({ type: 'varchar', nullable: true })
    telegram: string;

    @Column({ type: 'varchar', nullable: true })
    meta: Record<string, string>;
}
