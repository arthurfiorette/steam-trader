import { OfferContext, Next } from '../pipeline';

export default function middleware(context: OfferContext, next: Next) {
  const { processor, offer } = context;

  if (offer.isGlitched()) {
    processor.decline(offer);
    return;
  }

  return next();
}
