import Account from '../accounts/account';
import { saveOffer } from '../storage/trades';
import Pipeline from '../util/middleware';
import logic from './logic';
import { Offer, OfferContext } from './types';

export type Processor = (offer: Offer) => Promise<Offer>;

function createContext(offer: Offer, processor: TradeProcessor): OfferContext {
  return {
    ...offer,
    processor,
    giveItemsPrices: [],
    givePrice: 0,
    receiveItemsPrices: [],
    receivePrice: 0,
    // @ts-ignore
    profit: 'Not calculated'
  };
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
    logger.info(`${reason}. Declining trade ${offer.id}...`);
    await offer.decline((err) => {
      if (err) {
        logger.error(`Catch an error while trying to decline the trade ${offer.id}`, err);
        return;
      }
      saveOffer(offer, reason, false);
      logger.info(`Declined trade ${offer.id}`);
    });
  }

  async accept(offer: OfferContext, reason: Reason) {
    const { logger } = this.account;
    logger.info(`${reason}. Accepting trade ${offer.id}...`);
    await offer.accept((err) => {
      if (err) {
        logger.error(`Catch an error while trying to accept the trade ${offer.id}`, err);
        return;
      }
      saveOffer(offer, reason, true);
      logger.info(`Accepted trade ${offer.id}`);
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
