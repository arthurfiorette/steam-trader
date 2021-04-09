import { NextFunction } from '../../util/middleware';
import { Reason } from '../processor';
import { OfferContext } from '../types';

export default function middleware(context: OfferContext, next: NextFunction) {
  const { processor, isGlitched } = context;

  if (isGlitched()) {
    processor.decline(context, Reason.GLITCHED);
    return;
  }

  return next();
}
