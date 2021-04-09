import { NextFunction } from '../../util/middleware';
import { Reason } from '../processor';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, itemsToReceive } = context;

  const unmarketable = itemsToReceive.filter((item) => !item.marketable);
  if (unmarketable.length > 0) {
    processor.decline(context, Reason.UNMARKETABLE);
  }

  return next();
}
