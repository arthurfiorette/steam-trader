import config from '../../config.json';
import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';
import SteamTotp from 'steam-totp';
import TradeOfferManager from 'steam-tradeoffer-manager';
import { info, Ad } from './logger';

Ad.startup();

const client = new SteamUser();
const community = new SteamCommunity();

const manager = new TradeOfferManager({
  steam: client,
  community,
  language: 'en'
});

info('TradeOfferManager is ready');

const { username, sharedSecret, password } = config.steam;
const { gameId } = config.info;

client.logOn({
  accountName: username,
  password: password,
  twoFactorCode: SteamTotp.generateAuthCode(sharedSecret)
});

client.on('loggedOn', () => {
  info(`Logged into steam with username ${username}`);
  client.setPersona(1);
  client.gamesPlayed(gameId);
});

info('App initialized');
