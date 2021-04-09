import { ICurrency } from '../steam/currency';

export interface AccountOptions {
  readonly login: {
    username: string;
    password: string;
    sharedSecret: string;
    identity: string;
  };
  status: {
    gameId: number;
    currency?: ICurrency;
  };
  trading: {
    trashLimit: number;
    owners: string[];
    tradeWith0Profit: boolean;
  };
}
