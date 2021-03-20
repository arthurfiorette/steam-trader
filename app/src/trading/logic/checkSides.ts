import { NextFunction } from '../../util/middleware';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, offer } = context;

  if (offer.itemsToReceive.length < 1) {
    processor.decline(offer);
    return;
  } else if (offer.itemsToGive.length < 1) {
    processor.accept(offer);
    return;
  }

  return next();
}
