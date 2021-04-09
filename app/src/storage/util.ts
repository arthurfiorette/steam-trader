import { getItemName } from '../steam/market';
import { OfferContext } from '../transactions/types';

type simplifyOptions = {
  account: string;
  context: OfferContext;
  reason: string;
  accepted: boolean;
  mapItems: boolean;
};

export function simplifyOffer({
  account,
  context,
  reason,
  accepted,
  mapItems
}: simplifyOptions) {
  const { partner, id: offerId, itemsToGive, itemsToReceive, profit } = context;
  return {
    account,
    profit,
    reason,
    accepted,
    offerId,
    partnerId: partner.getSteamID64(),
    ourItems: itemsToGive.map((i) => (mapItems ? getItemName(i) : i)),
    theirItems: itemsToReceive.map((i) => (mapItems ? getItemName(i) : i))
  };
}
