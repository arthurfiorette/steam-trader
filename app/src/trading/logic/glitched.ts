import { NextFunction } from '../../util/middleware';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, offer } = context;

  if (offer.isGlitched()) {
    processor.decline(offer);
    return;
  }

  return next();
}
