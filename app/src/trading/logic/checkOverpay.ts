import { OfferContext, Next } from '../pipeline';

export default function middleware(context: OfferContext, next: Next) {
  const { processor, offer, givePrice, receivePrice } = context;
  const { trading } = context.processor.account.options;

  if (givePrice > receivePrice) {
    processor.decline(offer);
    return;
  } else if (givePrice === receivePrice && trading.tradeWith0Profit) {
    processor.accept(offer);
    return;
  }

  return next();
}
