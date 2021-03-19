import { info, warn } from '../logger';
import config from '../../config.json';
import { getAllItemsPrice } from './market';
import { Offer, Community } from './types';
import { containsUnmarketable, isTrash, calculatePrice } from './analyzer';
import { acceptOffer, declineOffer, Reason } from './trader';

const { ownerIds, tradeWith0Profit } = config.trading;

export async function process(offer: Offer, community: Community): Promise<void> {
  info('Received an offer');

  const { partner, message, itemsToGive, itemsToReceive } = offer;

  if (message && message.length > 0) {
    info('This offer came with a message:', message);
  }

  if (offer.isGlitched()) {
    warn('Received glitched offer, declining...');
    return declineOffer(offer, Reason.GLITCHED);
  }

  // I transform partner.getSteamID64() to string because it was reading wrong. IDK why.
  if (ownerIds.includes(`${partner.getSteamID64()}`)) {
    info('Trade partner is owner');
    return acceptOffer(community, offer);
  }

  info(`All our items are: ${itemsToGive.map((item) => item.name)}`);

  info(`Their items are: ${itemsToReceive.map((item) => item.name)}`);

  if (itemsToReceive.length < 1) {
    info('Their item list are empty. declining...');
    return declineOffer(offer, Reason.NEGATIVE_PROFIT);
  } else {
    if (containsUnmarketable(itemsToReceive, (items) => info(`There's unmarketable itens in the trade: ${items}`))) {
      info('Declining trade');
      return declineOffer(offer, Reason.UNMARKETABLE_ITEM);
    }

    const isGift = itemsToGive.length < 1;

    info(isGift ? 'Our item list are empty. Accepting gift...' : 'They have items to trade. Analyzing...');
    info('Getting market prices.');

    const receiveItemsPrices = await getAllItemsPrice(itemsToReceive);

    if (receiveItemsPrices.some(isTrash)) {
      warn('Trade received with in the trash limit. Declining offer');
      return declineOffer(offer, Reason.TRASH_LIMIT);
    }

    const receivePrice = receiveItemsPrices.map(calculatePrice).reduce((a, b) => a + b);

    const givePrice = (await getAllItemsPrice(itemsToGive)).map(calculatePrice).reduce((a, b) => a + b, 0);

    info(`Our price are: '$${givePrice}' and their price are: '$${receivePrice}'`);

    if (isGift) {
      info('Accepting gift');
      return acceptOffer(community,offer, receivePrice);
    } else {
      if (givePrice > receivePrice) {
        info('We are overpaying. Declining offer...');
        return declineOffer(offer, Reason.NEGATIVE_PROFIT);
      } else {
        if (givePrice == receivePrice) {
          info('This trade profit equal to 0');
          if (!tradeWith0Profit) {
            info(`The flag 'tradeWith0Profit' is false. Declining offer...`);
            return declineOffer(offer, Reason.ZERO_PROFIT);
          } else {
            info(`Trading in the same way as the flag 'tradeWith0Profit' is true`);
          }
        }

        const profit = receivePrice - givePrice;

        info(`Our profit is ${profit}. Accepting offer...`);
        return acceptOffer(community, offer, profit);
      }
    }
  }
}
