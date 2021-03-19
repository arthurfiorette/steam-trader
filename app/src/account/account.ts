import { SteamCommunity, TradeOfferManager, SteamUser } from '../untyped';
import SteamTotp from 'steam-totp';
import Logger from './logger';
import TradeProcessor from '../trading/processor';
import { ICurrency, getCurrency } from '../steam/currency';
import {Offer} from '../trading/types'

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

const language = 'en';

export default class Account {
  readonly client = new SteamUser();
  readonly community = new SteamCommunity();
  readonly manager: TradeOfferManager;
  readonly logger = new Logger(this);
  readonly trader = new TradeProcessor(this);

  constructor(readonly options: AccountOptions) {
    const { client, community } = this;

    this.manager = new TradeOfferManager({
      steam: client,
      community,
      language
    });
  }

  async login() {
    const { username, password } = this.options.login;
    await this.client.logOn({
      accountName: username,
      password: password,
      twoFactorCode: this.getAuthCode(),
      rememberPassword: true,
      machineName: 'steam-trader'
    });
    await this.setupListeners();
  }

  async logoff() {
    this.client.logOff();
  }

  private setupListeners() {
    const { manager, client } = this;
    client.on('loggedOn', () => {
      const { options } = this;
      client.setPersona(1);
      client.gamesPlayed(options.status.gameId);
    });
    client.on('steamGuard', (_domain: any, callback: (code: string) => void) => {
      callback(this.getAuthCode());
    });
    client.on('webSession', (_sessionId: number, cookies: string[]) => {
      const { community, options } = this;
      manager.setCookies(cookies);
      community.setCookies(cookies);
      community.startConfirmationChecker(2000, options.login.identity);
    });
    client.on('wallet', (_hasWallet: boolean, currency: number) => {
      this.options.status.currency = getCurrency(currency);
    });
    manager.on('newOffer', (offer: Offer) => this.trader.begin(offer));
  }

  private getAuthCode(): string {
    const { sharedSecret } = this.options.login;
    return SteamTotp.generateAuthCode(sharedSecret);
  }
}
