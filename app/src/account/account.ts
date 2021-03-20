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

  constructor(readonly options: AccountOptions) {}

  login() {
    const { client, options } = this;
    const { username, password } = options.login;
    client.logOn({
      accountName: username,
      password,
      twoFactorCode: this.getAuthCode(),
      rememberPassword: true,
      machineName: 'steam-trader'
    });
    client.on('loggedOn', () => this.onLogin());
  }

  logoff() {
    this.client.logOff();
  }

  private onLogin() {
    const { options, client, manager, getAuthCode, onWebSession, trader, setCurrency } = this;
    client.setPersona(1);
    client.gamesPlayed(options.status.gameId);

    client.on('steamGuard', (_domain: any, callback: (code: string) => void) => callback(getAuthCode()));
    client.on('webSession', (_sessionId: number, cookies: string[]) => onWebSession(cookies));
    client.on('wallet', (_hasWallet: boolean, currency: number) => setCurrency(currency));
    manager.on('newOffer', (offer: Offer) => trader.begin(offer));
  }

  private onWebSession(cookies: string[]) {
    const { community, options, manager } = this;
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(2000, options.login.identity);
  }

  private setCurrency(currency: number) {
    this.options.status.currency = getCurrency(currency);
  }

  private getAuthCode() {
    const { sharedSecret } = this.options.login;
    return SteamTotp.generateAuthCode(sharedSecret);
  }
}
