import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';
import { Item, OfferContext } from '../transactions/types';

const PATH = path.resolve(__dirname, '../../output/trades/');

let server: Server;

export function setServer(_server: Server) {
  server = _server;
}

export default function save(context: OfferContext, reason: string) {
  saveToDisk(context, reason);
  emitToSocket(context, reason);
}

function saveToDisk(context: OfferContext, reason: string) {
  const name = context.processor.account.options.login.username;
  const { id } = context.offer;
  const filePath = path.resolve(PATH, `${name}/${id}`);
  context.processor.account.logger.debug(`Saving transaction ${id}`);
  fs.writeFileSync(filePath, JSON.stringify(serializeTransaction(name, context, reason)));
}

function emitToSocket(offer: OfferContext, reason: string) {
  const name = offer.processor.account.options.login.username;
  if (server) {
    server.emit('trade', serializeTransaction(name, offer, reason));
  }
}

function serializeTransaction(account: string, { offer, profit }: OfferContext, reason: string) {
  const mapItems = (items: Item[]) => items.map((item) => item.market_hash_name);
  return {
    account,
    partner: offer.partner.getSteamID64(),
    offerId: offer.id,
    profit,
    ourItems: mapItems(offer.itemsToGive),
    theirItems: mapItems(offer.itemsToReceive),
    reason
  };
}
