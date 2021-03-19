import { OfferContext, Next } from '../pipeline';

export default function middleware(context: OfferContext, next: Next) {
  const { processor, offer } = context;

  const unmarketable = offer.itemsToReceive.filter((item) => !item.marketable);
  if(unmarketable.length > 0) {
    processor.decline(offer);
  }
  
  return next();
}