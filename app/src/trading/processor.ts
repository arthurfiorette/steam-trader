import Account from '../account/account';
import { Offer, OfferContext } from './types';
import logic from './logic';
import Pipeline from '../util/middleware';

export type Processor = (offer: Offer) => Promise<Offer>;

function createContext(offer: Offer, processor: TradeProcessor): OfferContext {
  return { offer, processor, giveItemsPrices: [], givePrice: 0, receiveItemsPrices: [], receivePrice: 0, profit: 0 };
}

export default class TradeProcessor {
  private readonly pipeline = new Pipeline<OfferContext>(logic);

  constructor(readonly account: Account) {}

  async begin(offer: Offer) {
    await this.pipeline.execute(createContext(offer, this));
  }

  async decline(offer: OfferContext) {
    this.account.storage.saveTransaction(offer, true);
    await offer.offer.decline((err) => {
      if (err) throw err;
    });
  }

  async accept(offer: OfferContext) {
    const { community, storage } = this.account;
    community.checkConfirmations();
    storage.saveTransaction(offer, true);
    await offer.offer.accept((err) => {
      if (err) throw err;
    });
  }
}
