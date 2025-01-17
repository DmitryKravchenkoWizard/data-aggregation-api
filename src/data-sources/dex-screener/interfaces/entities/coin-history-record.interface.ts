import { ICoin } from './coin.interface';

export interface ICoinHistoryRecord {
  id: number; // Primary key
  coinId: number; // Foreign key to the coin table
  // Valuation data
  marketCap: number; // Market capitalization
  fdv: number; // Fully Diluted Valuation
  // Price information
  priceNative: number; // Price in native currency
  priceUsd: number; // Price in USD
  // Transaction data (Buys and Sells)
  buysTxnsM5: number;
  buysTxnsH1: number;
  buysTxnsH6: number;
  buysTxnsH24: number;

  sellsTxnsM5: number;
  sellsTxnsH1: number;
  sellsTxnsH6: number;
  sellsTxnsH24: number;

  // Volume data
  volumeM5: number;
  volumeH1: number;
  volumeH6: number;
  volumeH24: number;

  // Price change data
  priceChangeM5: number; // Percentage change in the last 5 minutes
  priceChangeH1: number; // Percentage change in the last hour
  priceChangeH6: number; // Percentage change in the last 6 hours
  priceChangeH24: number; // Percentage change in the last 24 hours

  // Liquidity data
  liquidityUsd: number; // Liquidity in USD
  liquidityBase: number; // Liquidity in base tokens
  liquidityQuote: number; // Liquidity in quote tokens

  // Timestamps
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Record last update timestamp
}
