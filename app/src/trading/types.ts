export interface Partner {
  getSteamID64(): string;
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
  median_price?: number;
}

export interface Offer {
  isGlitched: () => boolean;
  accept: (err?: (err: null | Error) => void) => void;
  decline: (err?: (err: null | Error) => void) => void;
  partner: Partner;
  itemsToGive: Item[];
  itemsToReceive: Item[];
  message: string;
  isOurOffer: boolean;
}

export interface Community {
  checkConfirmations: (callback?: (err: null | Error) => void) => void;
}
