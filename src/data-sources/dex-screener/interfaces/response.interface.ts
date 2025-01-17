export interface DexScreenerResponse {
  schemaVersion: string;
  pairs: IPair[];
  pair?: IPair;
}

export interface IPair {
  chainId: string; // Blockchain identifier (e.g., "solana")
  dexId: string; // DEX identifier (e.g., "raydium")
  url: string; // URL of the pair on Dex Screener
  pairAddress: string; // Address of the trading pair
  labels?: string[]; // Optional labels (e.g., "DLMM", "DYN")
  baseToken: Token; // Base token details
  quoteToken: Token; // Quote token details
  priceNative: string; // Price in native tokens /   COIN_NAME / SOL
  priceUsd: string; // Price in USD
  txns: Transactions; // Transaction statistics
  volume: Volume; // Volume statistics
  priceChange: PriceChange; // Price change statistics
  liquidity: Liquidity; // Liquidity data
  fdv: number; // Fully Diluted Valuation
  marketCap: number; // Market capitalization
  pairCreatedAt: number; // Creation timestamp
  info: Info; // Additional information (e.g., images, socials)
  boosts?: Boosts; // Optional boost information
}

export interface Token {
  address: string; // Token address
  name: string; // Token name
  symbol: string; // Token symbol
}

export interface Transactions {
  m5: TxnStats; // Transactions in the last 5 minutes
  h1: TxnStats; // Transactions in the last hour
  h6: TxnStats; // Transactions in the last 6 hours
  h24: TxnStats; // Transactions in the last 24 hours
}

export interface TxnStats {
  buys: number; // Number of buy transactions
  sells: number; // Number of sell transactions
}

export interface Volume {
  m5: number; // Volume in the last 5 minutes
  h1: number; // Volume in the last hour
  h6: number; // Volume in the last 6 hours
  h24: number; // Volume in the last 24 hours
}

export interface PriceChange {
  m5: number; // Price change in the last 5 minutes
  h1: number; // Price change in the last hour
  h6: number; // Price change in the last 6 hours
  h24: number; // Price change in the last 24 hours
}

export interface Liquidity {
  usd: number; // Liquidity in USD
  base: number; // Liquidity in base tokens
  quote: number; // Liquidity in quote tokens
}

export interface Info {
  imageUrl: string; // URL to the token image
  header: string; // URL to the token header image
  openGraph: string; // URL to the OpenGraph image
  websites?: Website[]; // List of related websites
  socials?: Social[]; // List of related social media links
}

export interface Website {
  label: string; // Label for the website
  url: string; // URL of the website
}

export interface Social {
  type: string; // Type of social media (e.g., "twitter", "telegram")
  url: string; // URL of the social media page
}

export interface Boosts {
  active: number; // Active boost value
}
