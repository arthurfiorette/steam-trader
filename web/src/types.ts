export type AccountOptions = {
  login: {
    username: string;
    password: string;
    sharedSecret: string;
    identity: string;
  };
  status: {
    gameId: number;
    online?: boolean;
  };
  trading: {
    trashLimit: number;
    owners: string[];
    tradeWith0Profit: boolean;
  };
};

export type LogJSON = {
  level: string;
  message: string;
  timestamp: number;
  account: string;
};

export type TradeJSON = {
  account: string;
  partner: string;
  offerId: string;
  profit: number;
  ourItems: Item[];
  theirItems: Item[];
  reason: string;
  accepted: boolean;
};

export type Item = {
  name: string;
  market_name: string;
  market_hash_name: string;
  name_color: string;
  icon_url: string;
};
