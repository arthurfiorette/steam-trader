import Processor from './processor';

export interface Partner {
  getSteamID64(): string;
}

export interface Item {
  market_hash_name: string;
  name: string;
  market_name: string;
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
  id: string;
}

export interface Community {
  checkConfirmations: (callback?: (err: null | Error) => void) => void;
}

export type OfferContext = {
  readonly processor: Processor;
  readonly offer: Offer;
  receiveItemsPrices: ItemPrice[];
  receivePrice: number;
  giveItemsPrices: ItemPrice[];
  givePrice: number;
  profit: number;
};
