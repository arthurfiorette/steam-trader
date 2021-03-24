import axios from 'axios';
import { ItemPrice, Item } from '../transactions/types';
import Currency from './currency';

const { parse: cleanPrice } = Currency.DEFAULT;

const priceOverview = 'http://steamcommunity.com/market/priceoverview';

export async function getItemPrice(item: Item): Promise<ItemPrice> {
  const { appid } = item;
  const params = { appid, currency: Currency.DEFAULT.currencyId, market_hash_name: getItemName(item) };
  console.log(item, priceOverview, { params })
  const { data } = await axios.get(priceOverview, { params });
  return parseData(data);
}

function getItemName({market_name, market_hash_name, name}: Item) {
  const isEmpty = (n: string) => n && n.length !== 0;
  if(isEmpty(market_hash_name)) return market_hash_name;
  if(isEmpty(market_name)) return market_name;
  return name;
}

function parseData({ success, lowest_price, median_price }: any): ItemPrice {
  return {
    success,
    lowest_price: cleanPrice(lowest_price),
    median_price: median_price ? cleanPrice(median_price) : undefined
  };
}

export async function getAllItemsPrice(items: Item[]): Promise<ItemPrice[]> {
  return Promise.all(items.map(item => getItemPrice(item)));
}
