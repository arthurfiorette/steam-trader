import { trading } from '../../config.json';
import { Item, ItemPrice } from './types';

export function isTrash(item: ItemPrice): boolean {
  return calculatePrice(item) <= trading.trashValue;
}

export function containsUnmarketable(items: Item[], callback: (items: Item[]) => void): boolean {
  const unmarketable = items.filter((item) => !item.marketable);
  if (unmarketable.length > 0) {
    callback(unmarketable);
    return true;
  } else return false;
}

export function calculatePrice({ median_price, lowest_price }: ItemPrice): number {
  return !median_price || lowest_price > median_price ? lowest_price : median_price + lowest_price / 2;
}
