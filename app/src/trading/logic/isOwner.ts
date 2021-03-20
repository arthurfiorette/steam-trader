import { NextFunction } from '../../util/middleware';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, offer } = context;
  const { owners } = processor.account.options.trading;

  // I transform partner.getSteamID64() to string because it was reading wrong. IDK why.
  if (owners.includes(offer.partner.getSteamID64())) {
    processor.accept(context);
    return;
  }

  return next();
}
