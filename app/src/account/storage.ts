import { Item, OfferContext } from '../trading/types';
import Account from './account';
import fs from 'fs';
import path from 'path';

const PATH = path.resolve(__dirname, '../../output/trades/');

export default class Storage {
  constructor(readonly account: Account) {
    fs.mkdir(PATH, (err) => {} /* Folder already exists */);
  }

  async saveTransaction(context: OfferContext, accepted: boolean) {
    fs.writeFileSync(this.getPath(context.offer.id), this.stringifyTransaction(context, accepted));
  }

  private getPath(id: string) {
    return path.resolve(PATH, `${id}.json`);
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
