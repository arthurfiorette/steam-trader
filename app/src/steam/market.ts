import axios from 'axios';
import { ItemPrice, Item } from '../trading/types';
import Currency from './currency';

const { parse:cleanPrice } = Currency.DEFAULT;

const priceOverview = 'http://steamcommunity.com/market/priceoverview';

export async function getItemPrice({ appid, market_hash_name }: Item): Promise<ItemPrice> {
  const params = { appid, currency: Currency.DEFAULT, market_hash_name };
  const { data } = await axios.get(priceOverview, { params });
  return parseData(data);
}

function parseData({ success, lowest_price, median_price }: any): ItemPrice {
  return {
    success,
    lowest_price: cleanPrice(lowest_price),
    median_price: median_price ? cleanPrice(median_price) : undefined
  };
}

export async function getAllItemsPrice(items: Item[]): Promise<ItemPrice[]> {
  return await Promise.all(items.map(getItemPrice));
}
