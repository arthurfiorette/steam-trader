import { OfferContext, Next } from '../pipeline';

export default function middleware(context: OfferContext, next: Next) {
  context.profit = context.receivePrice - context.givePrice;

  const { processor, offer, profit } = context;
  const { trading } = context.processor.account.options;

  if (profit < 0) {
    processor.decline(offer);
    return;
  } else if (profit == 0) {
    if (trading.tradeWith0Profit) {
      processor.accept(offer);
    } else {
      processor.decline(offer);
    }
    return;
  }

  return next();
}
