import config from '../config.json';
import SteamTotp from 'steam-totp';
// @ts-ignore https://github.com/TypeStrong/ts-node#help-my-types-are-missing
import SteamCommunity from 'steamcommunity';
// @ts-ignore https://github.com/TypeStrong/ts-node#help-my-types-are-missing
import SteamUser from 'steam-user';
// @ts-ignore https://github.com/TypeStrong/ts-node#help-my-types-are-missing
import TradeOfferManager from 'steam-tradeoffer-manager';
import { info, Ad } from './logger';
import { Offer } from './trade/types';
import { process } from './trade/processor';

Ad.startup();

const client = new SteamUser();
const community = new SteamCommunity();

const manager = new TradeOfferManager({
  steam: client,
  community,
  language: 'en'
});

info('TradeOfferManager is ready');

const { username, sharedSecret, password, identitySecret } = config.steam;
const { gameId: statusGameId } = config.status;

client.logOn({
  accountName: username,
  password: password,
  twoFactorCode: SteamTotp.generateAuthCode(sharedSecret)
});

client.on('loggedOn', () => {
  client.setPersona(1);
  client.gamesPlayed(statusGameId);
  info(`Logged into steam with username: '${username}'. Playing game id: '${statusGameId}'`);
});

client.on('webSession', (_sessionId: number, cookies: string[]) => {
  manager.setCookies(cookies);
  community.setCookies(cookies);
  community.startConfirmationChecker(2000, identitySecret);
});

manager.on('newOffer', (offer: Offer) => process(offer, community).then(() => info('Offer processed.')));

info('App initialized');
