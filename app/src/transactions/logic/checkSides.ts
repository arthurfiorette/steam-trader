import { NextFunction } from '../../util/middleware';
import { Reason } from '../processor';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, itemsToGive, itemsToReceive } = context;

  if (itemsToReceive.length < 1) {
    processor.decline(context, Reason.OVERPAY);
    return;
  } else if (itemsToGive.length < 1) {
    processor.accept(context, Reason.GIFT);
    return;
  }

  return next();
}
