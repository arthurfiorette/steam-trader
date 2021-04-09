import { NextFunction } from '../../util/middleware';
import { Reason } from '../processor';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, partner } = context;
  const { owners } = processor.account.options.trading;

  if (owners.includes(partner.getSteamID64())) {
    processor.accept(context, Reason.OWNER);
    return;
  }

  return next();
}
