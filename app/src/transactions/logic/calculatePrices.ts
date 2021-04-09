import { NextFunction } from '../../util/middleware';
import { getAllItemsPrice } from '../../steam/market';
import { AccountOptions } from '../../accounts/options';
import { ItemPrice, OfferContext } from '../types';
import { Reason } from '../processor';

export default async function middleware(
  context: OfferContext,
  next: NextFunction
) {
  const { processor, itemsToReceive, itemsToGive } = context;

  context.receiveItemsPrices = await getAllItemsPrice(itemsToReceive);

  if (
    context.receiveItemsPrices.some((item) =>
      isTrash(item, processor.account.options)
    )
  ) {
    processor.decline(context, Reason.TRASH);
  }

  context.receivePrice = reducePrices(context.receiveItemsPrices);

  context.giveItemsPrices = await getAllItemsPrice(itemsToGive);
  context.givePrice = reducePrices(context.giveItemsPrices);

  return next();
}

export function isTrash(item: ItemPrice, options: AccountOptions): boolean {
  return calculatePrice(item) <= options.trading.trashLimit;
}

export function calculatePrice({
  median_price,
  lowest_price
}: ItemPrice): number {
  return !median_price || lowest_price > median_price
    ? lowest_price
    : median_price + lowest_price / 2;
}

function reducePrices(items: ItemPrice[]): number {
  return items.map(calculatePrice).reduce((a, b) => a + b, 0);
}
