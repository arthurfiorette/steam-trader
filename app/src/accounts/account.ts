import { SteamCommunity, TradeOfferManager, SteamUser } from '../untyped';
import SteamTotp from 'steam-totp';
import TradeProcessor from '../transactions/processor';
import { getCurrency } from '../steam/currency';
import { Offer } from '../transactions/types';
import createLogger from '../logger';
import { serializer } from './serializer';
import { update } from '../server/socket/updater';
import { AccountOptions } from './options';
import { nextTick } from 'process';

export default class Account {
  readonly client = new SteamUser();
  readonly community = new SteamCommunity();
  readonly manager = new TradeOfferManager({
    steam: this.client,
    community: this.community,
    language: 'en'
  });
  readonly logger;
  readonly trader = new TradeProcessor(this);

  constructor(readonly options: AccountOptions) {
    this.logger = createLogger(options.login.username);
    this.logger.info(
      `'${options.login.username}' was created, waiting for login...`
    );

    this.client.on('webSession', (_sessionId: number, cookies: string[]) =>
      this.onWebSession(cookies)
    );
    this.client.on('wallet', (_hasWallet: boolean, currency: number) =>
      this.setCurrency(currency)
    );
    this.client.on('loggedOn', () => this.onLogin());
    this.client.on('disconnected', (_eResult: number, msg: string) =>
      this.onDisconnect(msg)
    );
    this.client.on(
      'steamGuard',
      (_domain: any, callback: (code: string) => void) =>
        callback(this.getAuthCode())
    );
    this.manager.on('newOffer', (offer: Offer) => this.trader.begin(offer));
    this.client.on('error', (err: any) =>
      this.logger.error(
        `Occurred an error on the last operation: ${err.message}`
      )
    );
  }

  login() {
    const { client, options, logger, online } = this;
    logger.info('Attempting to logging In');
    if (online) {
      logger.warn('Login attempt, but we are already logged in');
      return;
    }
    client.logOn({
      accountName: options.login.username,
      password: options.login.password,
      twoFactorCode: this.getAuthCode(),
      machineName: 'steam-trader'
    });
  }

  logoff() {
    this.logger.info(`Attempting to log Off`);
    if (!this.online) {
      this.logger.warn('Logoff attempt, but we are already logged off');
      return;
    }
    this.client.logOff();
  }

  private onLogin() {
    const { options, client, logger } = this;
    logger.info('We logged in');
    client.setPersona(1);
    if (options.status.gameId !== -1) {
      client.gamesPlayed(Number(options.status.gameId));
    }
    this.update();
  }

  private onDisconnect(msg: string) {
    this.logger.info(`We logged off: ${msg}`);
    this.update();
  }

  private onWebSession(cookies: string[]) {
    const { community, options, manager, logger } = this;
    logger.debug('Started web session, delivering cookies');
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

  update() {
    nextTick(() => update(this));
  }

  get online() {
    return !!this.client.steamID;
  }

  serialize() {
    return serializer(this);
  }
}
