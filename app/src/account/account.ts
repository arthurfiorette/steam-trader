import { SteamCommunity, TradeOfferManager, SteamUser } from '../untyped';
import SteamTotp from 'steam-totp';
import TradeProcessor from '../trading/processor';
import { ICurrency, getCurrency } from '../steam/currency';
import { Offer } from '../trading/types';
import Storage from './storage';
import Logger from './logger';

const language = 'en';

export interface AccountOptions {
  readonly login: {
    username: string;
    password: string;
    sharedSecret: string;
    identity: string;
  };
  status: {
    gameId: number;
    currency?: ICurrency;
  };
  trading: {
    trashLimit: number;
    owners: string[];
    tradeWith0Profit: boolean;
  };
}

export default class Account {
  readonly client = new SteamUser();
  readonly community = new SteamCommunity();
  readonly manager = new TradeOfferManager({ steam: this.client, community: this.community, language });
  readonly logger = Logger(this);
  readonly trader = new TradeProcessor(this);
  readonly storage = new Storage(this);

  constructor(readonly options: AccountOptions) {
    this.logger.info(`The account was created, waiting for login...`);
  }

  login() {
    this.logger.info('logging In');
    const { client, options, manager, trader } = this;
    const { username, password } = options.login;
    client.logOn({
      accountName: username,
      password,
      twoFactorCode: this.getAuthCode(),
      rememberPassword: true,
      machineName: 'steam-trader'
    });
    this.logger.debug('Starting to listen!');
    client.on('webSession', (_sessionId: number, cookies: string[]) => this.onWebSession(cookies));
    client.on('wallet', (_hasWallet: boolean, currency: number) => this.setCurrency(currency));
    client.on('loggedOn', () => this.onLogin());
    client.on('steamGuard', (_domain: any, callback: (code: string) => void) => callback(this.getAuthCode()));
    manager.on('newOffer', (offer: Offer) => trader.begin(offer));
  }

  logoff() {
    this.logger.info(`Logging Off`);
    this.client.logOff();
  }

  private onLogin() {
    this.logger.info('We logged in');
    const { options, client } = this;
    client.setPersona(1);
    client.gamesPlayed(options.status.gameId);
  }

  private onWebSession(cookies: string[]) {
    this.logger.debug('Started web session, delivering cookies');
    const { community, options, manager } = this;
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(2000, options.login.identity);
  }

  private setCurrency(c: number) {
    const currency = getCurrency(c);
    this.logger.debug(`The currency used is '${currency.name}'`);
    this.options.status.currency = getCurrency(c);
  }

  private getAuthCode() {
    const { sharedSecret } = this.options.login;
    const auth = SteamTotp.generateAuthCode(sharedSecret);
    this.logger.debug(`Requested steam guard auth code '${auth}'`);
    return auth;
  }
}
