import { Item, OfferContext } from '../trading/types';
import Account from './account';
import fs from 'fs';

export default class Storage {
  constructor(readonly account: Account) {}

  async saveTransaction(context: OfferContext, accepted: boolean) {
    fs.writeFileSync(this.getPath(context.offer.id), this.stringifyTransaction(context, accepted));
  }

  private getPath(id: string) {
    return `../../output/trades/${id}`;
  }

  private stringifyTransaction({ offer, profit }: OfferContext, accepted: boolean) {
    return JSON.stringify({
      accepted,
      account: this.account.options.login.username,
      partner: offer.partner.getSteamID64(),
      offerId: offer.id,
      profit,
      ourItems: mapItems(offer.itemsToGive),
      theirItems: mapItems(offer.itemsToReceive)
    });
  }
}

function mapItems(items: Item[]) {
  return items.map((item) => item.market_hash_name);
}
