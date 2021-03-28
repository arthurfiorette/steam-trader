import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';
import { Item, OfferContext } from '../transactions/types';
import { getItemName } from '../steam/market';

let server: Server;

export function setServer(_server: Server) {
  server = _server;
}

export default function save(context: OfferContext, reason: string, accepted: boolean) {
  saveToDisk(context, reason, accepted);
  emitToSocket(context, reason, accepted);
}

async function saveToDisk(context: OfferContext, reason: string, accepted: boolean) {
  const name = context.processor.account.options.login.username;
  const { id } = context.offer;
  context.processor.account.logger.debug(`Saving transaction ${id}`);
  writeFile(id, serializeTransaction(name, context, reason, accepted));
}

async function emitToSocket(offer: OfferContext, reason: string, accepted: boolean) {
  const name = offer.processor.account.options.login.username;
  if (server) {
    server.emit('trade', serializeTransaction(name, offer, reason, accepted));
  }
}

function writeFile(id: string, content: any) {
  const filePath = path.resolve(__dirname, `../../output/trades/`);
  fs.promises.mkdir(filePath, { recursive: true }).then(() => {
    fs.promises.writeFile(`${filePath}/${id}.json`, JSON.stringify(content));
  });
}

function serializeTransaction(account: string, { offer, profit }: OfferContext, reason: string, accepted: boolean) {
  return {
    account,
    partner: offer.partner.getSteamID64(),
    offerId: offer.id,
    profit,
    ourItems: offer.itemsToGive.map(getItemName),
    theirItems: offer.itemsToReceive.map(getItemName),
    reason,
    accepted
  };
}
