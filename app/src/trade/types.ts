export interface Partner {
  getSteamID64(): number;
}

export interface Item {
  market_hash_name: string;
  name: string;
  appid: number;
  amount: number;
  marketable: boolean;
  tradeable: boolean;
  commodity: boolean;
}

export interface ItemPrice {
  success: boolean;
  lowest_price: number;
  volume: number;
  median_price: number;
}

export interface Offer {
  isGlitched: () => boolean;
  accept: (err: (err: any) => void) => void;
  decline: (err: (err: any) => void) => void;
  partner: Partner;
  itemsToGive: Item[];
  itemsToReceive: Item[];
  message: string;
  isOurOffer: boolean;
}

export interface Community {}
