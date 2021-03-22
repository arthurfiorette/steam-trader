import { NextFunction } from '../../util/middleware';
import { Reason } from '../processor';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, offer } = context;
  const { owners } = processor.account.options.trading;

  if (owners.includes(offer.partner.getSteamID64())) {
    processor.accept(context, Reason.OWNER);
    return;
  }

  return next();
}
