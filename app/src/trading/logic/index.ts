import glitched from './glitched';
import isOwner from './isOwner';
import checkSides from './checkSides';
import unmarketable from './unmarketable';
import calculatePrices from './calculatePrices';
import checkOverpay from './checkOverpay';
import { Middleware } from '../../util/middleware';
import { OfferContext } from '../types';

function thenAccept(context: OfferContext) {
  const { processor, offer } = context;
  processor.accept(offer);
}

const logic: Middleware<OfferContext>[] = [glitched, isOwner, checkSides, unmarketable, calculatePrices, checkOverpay, thenAccept];

export default logic;
