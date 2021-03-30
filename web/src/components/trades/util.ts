export interface Trade {
  account: string;
  partner: string;
  offerId: string;
  profit: number;
  ourItems: Item[];
  theirItems: Item[];
  reason: string;
  accepted: boolean;
}

export interface Item {
  name: string;
  market_name: string;
  market_hash_name: string;
  name_color: string;
  icon_url: string;
}

export function getItemName({ market_name, market_hash_name, name }: Item) {
  const isEmpty = (n: string) => n && n.length !== 0;
  if (isEmpty(market_hash_name)) return market_hash_name;
  if (isEmpty(market_name)) return market_name;
  return name;
}

export function getImageUrl({ icon_url }: Item) {
  return `https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`;
}
