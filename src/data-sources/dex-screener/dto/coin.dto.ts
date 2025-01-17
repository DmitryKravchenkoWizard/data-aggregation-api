import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsUrl,
  ValidateNested,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CoinInfoDto } from './coin-info.dto';
import * as moment from 'moment';

export class CoinDto {
  @ApiProperty({
    description: 'Coin id',
    required: true,
    example: 1,
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  chainId?: number;

  @ApiPropertyOptional({
    example: 'A2ZEBubAoe7JbbhPft4EACiuwoqrYFDZUBd5J47sxg1z',
  })
  @IsOptional()
  @IsString()
  pairKey?: string;

  @ApiPropertyOptional({ example: 'MintKeyExample' })
  @IsOptional()
  @IsString()
  mintKey?: string;

  @ApiProperty({ example: 'Trump AI' })
  @IsString()
  mintName: string;

  @ApiPropertyOptional({ example: 'TRUMPAI' })
  @IsOptional()
  @IsString()
  mintSymbol?: string;

  @ApiPropertyOptional({ example: 'QuoteKeyExample' })
  @IsOptional()
  @IsString()
  quoteKey?: string;

  @ApiProperty({ example: 'Trump AI' })
  @IsString()
  quoteName: string;

  @ApiPropertyOptional({ example: 'TRUMPAI' })
  @IsOptional()
  @IsString()
  quoteSymbol?: string;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  detectedAt?: Date;

  @ApiPropertyOptional({ example: 'raydium' })
  @IsOptional()
  @IsString()
  marketMaker?: string;

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @ApiPropertyOptional({ example: 'https://t.me/example' })
  @IsOptional()
  @IsUrl()
  telegramUrl?: string;

  @ApiPropertyOptional({ type: CoinInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CoinInfoDto)
  meta?: CoinInfoDto;

  @ApiPropertyOptional({
    example: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  })
  @IsOptional()
  @IsString()
  tokenProgram?: string;

  @ApiPropertyOptional({ example: 'CreatorAccountExample' })
  @IsOptional()
  @IsString()
  creatorAccount?: string;

  @ApiPropertyOptional({ example: '100000000' })
  @IsOptional()
  @IsString()
  totalAmount?: string;

  @ApiPropertyOptional({ example: '50000000' })
  @IsOptional()
  @IsString()
  baseLockedAmount?: string;

  @ApiPropertyOptional({ example: '20000000' })
  @IsOptional()
  @IsString()
  baseBurnedAmount?: string;

  @ApiPropertyOptional({ example: '10%' })
  @IsOptional()
  @IsString()
  holdAmount?: string;

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
