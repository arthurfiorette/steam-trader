import { Middleware } from '../../util/middleware';
import { Reason } from '../processor';
import { OfferContext } from '../types';
import calculatePrices from './calculatePrices';
import checkOverpay from './checkOverpay';
import checkSides from './checkSides';
import glitched from './glitched';
import isOwner from './isOwner';
import unmarketable from './unmarketable';

const logic: Middleware<OfferContext>[] = [
  glitched,
  isOwner,
  checkSides,
  unmarketable,
  calculatePrices,
  checkOverpay,
  // If not rejected, accept at the end.
  (context: OfferContext) => context.processor.accept(context, Reason.PROFIT)
];

export default logic;
