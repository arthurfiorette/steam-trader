import Account from '../accounts/account';
import { Offer, OfferContext } from './types';
import logic from './logic';
import Pipeline from '../util/middleware';
import serialize from './serializer';

export type Processor = (offer: Offer) => Promise<Offer>;

function createContext(offer: Offer, processor: TradeProcessor): OfferContext {
  return { offer, processor, giveItemsPrices: [], givePrice: 0, receiveItemsPrices: [], receivePrice: 0, profit: 0 };
}

export default class TradeProcessor {
  private readonly pipeline = new Pipeline<OfferContext>(logic);

  constructor(readonly account: Account) {}

  async begin(offer: Offer) {
    this.account.logger.info(`Received an new trade. The id is ${offer.id}`);
    await this.pipeline.execute(createContext(offer, this));
  }

  async decline(offer: OfferContext, reason: Reason) {
    const { logger } = this.account;
    logger.info(`${reason}. Declining trade ${offer.offer.id}...`);
    await offer.offer.decline((err) => {
      if (err) {
        logger.error(`Catch an error while trying to decline the trade ${offer.offer.id}`, err);
        return;
      }
      logger.info(`Declined trade ${offer.offer.id}`);
    });
  }

  async accept(offer: OfferContext, reason: Reason) {
    const { logger } = this.account;
    logger.info(`${reason}. Accepting trade ${offer.offer.id}...`);
    await offer.offer.accept((err) => {
      if (err) {
        logger.error(`Catch an error while trying to accept the trade ${offer.offer.id}`, err);
        return;
      }
      logger.info(`Accepted trade ${offer.offer.id}`);
      serialize(offer, reason);
    });
  }
}

export enum Reason {
  GLITCHED = 'The trade was glitched',
  UNMARKETABLE = 'The trade contains unmarketable items',
  OWNER = 'The trade partner is listed as an owner of this bot',
  GIFT = 'The trade is a gift for us',
  OVERPAY = 'We will lose money accepting this trade',
  PROFIT = 'The trade is profitable',
  SAME_SIDES = `This trade have both sides at the same price and the flag 'tradeWith0Profit' is false`,
  TRASH = 'This trade has itens with an value lower than the trash limit',
  SAME_SIDES_TRUE = "This trade have both sides at the same price but the flag 'tradeWith0Profit' is true"
}
