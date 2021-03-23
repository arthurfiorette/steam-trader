import { Item, OfferContext } from '../transactions/types';
import fs from 'fs';
import path from 'path';

const PATH = path.resolve(__dirname, '../../output/trades/');

export default function save(context: OfferContext, reason: string) {
  const { account } = context.processor;
  const name = account.options.login.username;
  const { id } = context.offer;
  const filePath = path.resolve(PATH, `${name}/${id}`);
  account.logger.debug(`Saving transaction ${id}`);
  fs.writeFileSync(filePath, stringifyTransaction(name, context, reason));
}

function stringifyTransaction(account: string, { offer, profit }: OfferContext, reason: string) {
  const mapItems = (items: Item[]) => items.map((item) => item.market_hash_name);
  return JSON.stringify({
    account,
    partner: offer.partner.getSteamID64(),
    offerId: offer.id,
    profit,
    ourItems: mapItems(offer.itemsToGive),
    theirItems: mapItems(offer.itemsToReceive),
    reason
  });
}
