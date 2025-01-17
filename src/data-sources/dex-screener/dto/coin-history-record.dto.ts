import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsInt, IsOptional } from 'class-validator';
import * as moment from 'moment';

export class CoinHistoryRecordDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  coinId?: number;

  @ApiProperty({ example: '500000000.1234567890' })
  @IsNumber()
  marketCap: number;

  @ApiProperty({ example: '1000000000.1234567890' })
  @IsNumber()
  fdv: number;

  @ApiProperty({ example: 0.154 })
  @IsNumber()
  priceNative: number;

  @ApiProperty({ example: 25.5 })
  @IsNumber()
  priceUsd: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  buysTxnsM5: number;

  @ApiProperty({ example: 200 })
  @IsInt()
  buysTxnsH1: number;

  @ApiProperty({ example: 500 })
  @IsInt()
  buysTxnsH6: number;

  @ApiProperty({ example: 1000 })
  @IsInt()
  buysTxnsH24: number;

  @ApiProperty({ example: 80 })
  @IsInt()
  sellsTxnsM5: number;

  @ApiProperty({ example: 150 })
  @IsInt()
  sellsTxnsH1: number;

  @ApiProperty({ example: 400 })
  @IsInt()
  sellsTxnsH6: number;

  @ApiProperty({ example: 900 })
  @IsInt()
  sellsTxnsH24: number;

  @ApiProperty({ example: '5000.1234567890' })
  @IsNumber()
  volumeM5: number;

  @ApiProperty({ example: '10000.1234567890' })
  @IsNumber()
  volumeH1: number;

  @ApiProperty({ example: '30000.1234567890' })
  @IsNumber()
  volumeH6: number;

  @ApiProperty({ example: '50000.1234567890' })
  @IsNumber()
  volumeH24: number;

  @ApiProperty({ example: '0.12' })
  @IsNumber()
  priceChangeM5: number;

  @ApiProperty({ example: '-1.23' })
  @IsNumber()
  priceChangeH1: number;

  @ApiProperty({ example: '2.34' })
  @IsNumber()
  priceChangeH6: number;

  @ApiProperty({ example: '5.67' })
  @IsNumber()
  priceChangeH24: number;

  @ApiProperty({ example: '1000000.1234567890' })
  @IsNumber()
  liquidityUsd: number;

  @ApiProperty({ example: '500000.1234567890' })
  @IsNumber()
  liquidityBase: number;

  @ApiProperty({ example: '500000.1234567890' })
  @IsNumber()
  liquidityQuote: number;

  @ApiProperty({
    description: 'date of creation',
    example: moment.utc().format(),
    type: () => Date,
  })
    created_at: Date;

  @ApiProperty({
    description: 'date of last update',
    example: moment.utc().format(),
    type: () => Date,
  })
    updated_at: Date;
}
