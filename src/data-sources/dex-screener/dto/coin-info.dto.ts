import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CoinInfoDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    example:
      'https://dd.dexscreener.com/ds-data/tokens/solana/GFh9Neu4jVkopT9UVTxzhpZJiaqpqcGCqNgbzeyAQuki/header.png?key=bfaf70Trump AI',
  })
  @IsOptional()
  header?: string;

  @ApiPropertyOptional({
    example:
      'https://cdn.dexscreener.com/token-images/og/solana/GFh9Neu4jVkopT9UVTxzhpZJiaqpqcGCqNgbzeyAQuki?timestamp=1736790300000',
  })
  @IsOptional()
  openGraph?: string;

  @ApiPropertyOptional()
  @IsOptional()
  websites?: { label?: string; url?: string }[];

  @ApiPropertyOptional()
  @IsOptional()
  socials?: { type?: string; url?: string }[];
}
