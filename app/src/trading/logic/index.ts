import glitched from './glitched';
import isOwner from './isOwner';
import checkSides from './checkSides';
import unmarketable from './unmarketable';
import calculatePrices from './calculatePrices';
import checkOverpay from './checkOverpay';
import { Middleware } from '../../util/middleware';
import { OfferContext } from '../types';

const logic: Middleware<OfferContext>[] = [
  glitched,
  isOwner,
  checkSides,
  unmarketable,
  calculatePrices,
  checkOverpay,
  // If not rejected, accept at the end.
  (context: OfferContext) => context.processor.accept(context)
];

export default logic;
