import { NextFunction } from '../../util/middleware';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  context.profit = context.receivePrice - context.givePrice;

  const { processor, profit } = context;
  const { trading } = context.processor.account.options;

  if (profit < 0) {
    processor.decline(context);
    return;
  } else if (profit == 0) {
    if (trading.tradeWith0Profit) {
      processor.accept(context);
    } else {
      processor.decline(context);
    }
    return;
  }

  return next();
}
