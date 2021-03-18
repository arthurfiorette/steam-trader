import axios from 'axios';
import { error, info } from '../logger';
import { ItemPrice, Item } from './types';
import { calculatePrice, isTrash } from './analyzer';

export async function getItemPrice({ appid, market_hash_name }: Item): Promise<ItemPrice> {
  return new Promise<ItemPrice>(async (resolve, reject) => {
    const params = { appid, currency: 1, market_hash_name };
    try {
      const data = await axios.get('http://steamcommunity.com/market/priceoverview', { params });
      info('Received a response for the request on steamcommunity');
      return resolve(parseData(data));
    } catch (err) {
      error('Received and error when getting steam price overview:');
      return reject(err);
    }
  });
}

export async function getAllItemsPrice(items: Item[]) {
  const prices: ItemPrice[] = [];
  for(let item of items) {
    prices.push(await getItemPrice(item))
  }
  return prices;
}

function parseData({ success, lowest_price, volume, median_price }: any): ItemPrice {
  return {
    success,
    volume: Number(volume),
    lowest_price: cleanPrice(lowest_price),
    median_price: cleanPrice(median_price)
  };
}

function cleanPrice(price: string): number {
  return Number(price.substring(1));
}
