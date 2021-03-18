import { Offer } from './types';
import { info, warn, error } from '../logger';

export enum Reason {
  TRASH_LIMIT = 'Exists one or more itens with an value lower than the trash limit',
  GLITCHED = 'This trade was glitched',
  NEGATIVE_PROFIT = 'He proposed an offer that our profit is negative',
  UNMARKETABLE_ITEM = 'Exists one or more itens that are unmarketable',
  ZERO_PROFIT = `This trade have both sides at the same price and the flag 'tradeWith0Profit' is false`
}

export async function declineOffer(offer: Offer, reason: Reason) {
  await offer.decline((err) => {
    if (err) {
      error('Was thrown an error while declining this offer.', err);
      return;
    }
    warn(`Declined the offer. Reason: '${reason}'`);
  });
}

export async function acceptOffer(offer: Offer, profit?: number) {
  await offer.accept((err) => {
    if (err) {
      error('Was thrown an error while accepting this offer.', err);
      return;
    }
    info(`Accepted the offer with the profit of ${profit}`);
  });
}
