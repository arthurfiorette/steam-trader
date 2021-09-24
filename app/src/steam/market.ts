import axios from 'axios';
import { Item, ItemPrice } from '../transactions/types';
import { Currency, ICurrency } from './currency';

const priceOverview = 'http://steamcommunity.com/market/priceoverview';

export async function getItemPrice(
  item: Item,
  currency: ICurrency | undefined = Currency['USD']
): Promise<ItemPrice> {
  const { appid } = item;
  const params = {
    appid,
    currency: currency.steamId,
    market_hash_name: getItemName(item)
  };
  const { data } = await axios.get(priceOverview, { params });
  return parseData(data, currency);
}

export function getItemName({ market_name, market_hash_name, name }: Item) {
  const isEmpty = (n: string) => n && n.length !== 0;
  if (isEmpty(market_hash_name)) return market_hash_name;
  if (isEmpty(market_name)) return market_name;
  return name;
}

function parseData({ success, lowest_price, median_price }: any, { parse }: ICurrency): ItemPrice {
  return {
    success,
    lowest_price: parse(lowest_price),
    median_price: median_price ? parse(median_price) : undefined
  };
}

export async function getAllItemsPrice(items: Item[], currency?: ICurrency): Promise<ItemPrice[]> {
  return Promise.all(items.map((item) => getItemPrice(item, currency)));
}
