import glitched from './glitched';
import isOwner from './isOwner';
import checkSides from './checkSides';
import unmarketable from './unmarketable';
import calculatePrices from './calculatePrices';
import checkOverpay from './checkOverpay';
import { Middleware, OfferContext } from '../pipeline';

function thenAccept(context: OfferContext) {
  const { processor, offer } = context;
  processor.accept(offer);
}

const logic: Middleware[] = [glitched, isOwner, checkSides, unmarketable, calculatePrices, checkOverpay, thenAccept];

export default logic;
