import Account from '../account/account';
import { Offer } from './types';
import { Pipeline } from './pipeline';
import logic from './logic';

export type Processor = (offer: Offer) => Promise<Offer>;

export default class TradeProcessor {
  private readonly pipeline = new Pipeline(logic);

  constructor(readonly account: Account) {}

  async begin(offer: Offer) {
    await this.pipeline.execute({ offer, processor: this });
  }

  async decline(offer: Offer) {
    await offer.decline((err) => {
      if (err) throw err;
    });
  }

  async accept(offer: Offer) {
    this.account.community.checkConfirmations();
    await offer.accept((err) => {
      if (err) throw err;
    });
  }
}
