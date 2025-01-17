export interface ICoin {
  id: number;
  chainId: number; // Foreign key to ChainEntity

  pairKey: string | null; // Pair identifier

  // Token information
  mintKey: string | null; // Mint key or Token Address
  mintName: string; // Token name
  mintSymbol: string | null; // Token symbol

  quoteKey: string | null; // Quote token address
  quoteSymbol: string | null; // Quote token symbol
  quoteName: string; // Quote token name

  detectedAt: Date | null; // When the pair was detected on the blockchain
  marketMaker: string | null; // DEX platform (e.g., Raydium, Orca)

  // Timestamps
  created_at: Date;
  updated_at: Date;

  // // Relationships
  // chain: ChainEntity; // Many-to-one relationship
  // histories: CoinHistoryRecordEntity[]; // One-to-many relationship
  // lp_details: LPDetailsEntity[]; // One-to-many relationship

  // // External links and metadata
  // website_url: string | null;
  // telegram_url: string | null;
  // meta: ICoinInfo | null; // Additional metadata

  // // Token program and creator
  // token_program: string | null; // Token program address
  // creator_account: string | null; // Creator account

  // // Supply and emission data
  // total_amount: string | null; // Total supply
  // base_locked_amount: string | null; // Locked amount
  // base_burned_amount: string | null; // Burned amount
  // hold_amount: string | null; // Amount held by someone at launch
}
