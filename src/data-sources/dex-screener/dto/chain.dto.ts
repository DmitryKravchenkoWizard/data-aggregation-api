import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsPositive,
} from 'class-validator';
import * as moment from 'moment';

export class ChainDto {
  @ApiProperty({
    description: 'Chain id',
    required: true,
    example: 1,
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiPropertyOptional({
    description: 'Chain name',
    required: true,
    example: 'solana',
  })
  @IsString()
  name: string;

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
