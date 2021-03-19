import { OfferContext, Next } from '../pipeline';

export default function middleware(context: OfferContext, next: Next) {
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
