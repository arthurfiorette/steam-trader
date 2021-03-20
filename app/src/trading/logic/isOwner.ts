import { OfferContext, Next } from '../pipeline';

export default function middleware(context: OfferContext, next: Next) {
  const { processor, offer } = context;
  const { owners } = processor.account.options.trading;

  // I transform partner.getSteamID64() to string because it was reading wrong. IDK why.
  if (owners.includes(offer.partner.getSteamID64())) {
    processor.accept(offer);
    return;
  }

  return next();
}
