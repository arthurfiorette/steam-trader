import fs from 'fs/promises';
import path from 'path';
import { OfferContext } from '../transactions/types';
import { io } from '../server/index';
import { simplifyOffer } from './util';

const filePath = path.resolve(__dirname, `../../output/trades/`);
fs.mkdir(filePath).catch(() => {});

export async function writeOffer(
  context: OfferContext,
  reason: string,
  accepted: boolean
) {
  const account = context.processor.account.options.login.username;

  context.processor.account.logger.debug(`Saving transaction ${context.id}`);

  await fs.writeFile(
    `${filePath}/${context.id}.json`,
    JSON.stringify(
      simplifyOffer({ account, context, reason, accepted, mapItems: false })
    )
  );
}

export async function emitOffer(
  context: OfferContext,
  reason: string,
  accepted: boolean
) {
  const account = context.processor.account.options.login.username;
  io.emit(
    'trade',
    simplifyOffer({ account, context, reason, accepted, mapItems: true })
  );
}

export async function saveOffer(
  context: OfferContext,
  reason: string,
  accepted: boolean
) {
  return Promise.all([
    writeOffer(context, reason, accepted),
    emitOffer(context, reason, accepted)
  ]);
}
