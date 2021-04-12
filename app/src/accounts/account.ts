import { SteamCommunity, TradeOfferManager, SteamUser } from '../untyped';
import SteamTotp from 'steam-totp';
import TradeProcessor from '../transactions/processor';
import { getCurrency } from '../steam/currency';
import { Offer } from '../transactions/types';
import createLogger from '../logger';
import { serializer } from './serializer';
import { update } from '../server/socket/updater';
import { AccountOptions } from './options';

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
  }

  login() {
    this.logger.info('Attempting to logging In');
    if (this.online) {
      this.logger.warn('Login attempt, but we are already logged in');
      return;
    }
    const { client, options, manager, trader } = this;
    const { username: accountName, password } = options.login;
    client.logOn({
      accountName,
      password,
      twoFactorCode: this.getAuthCode(),
      machineName: 'steam-trader'
    });
    this.logger.debug('Starting to listen!');
    client.on('webSession', (_sessionId: number, cookies: string[]) =>
      this.onWebSession(cookies)
    );
    client.on('wallet', (_hasWallet: boolean, currency: number) =>
      this.setCurrency(currency)
    );
    client.on('loggedOn', () => this.onLogin());
    client.on('disconnected', (_eResult: number, msg: string) =>
      this.onDisconnect(msg)
    );
    client.on('steamGuard', (_domain: any, callback: (code: string) => void) =>
      callback(this.getAuthCode())
    );
    manager.on('newOffer', (offer: Offer) => trader.begin(offer));
    client.on('error', (err: any) =>
      this.logger.error(
        `Occurred an error on the last operation: ${err.message}`
      )
    );
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
    update(this);
  }

  private onDisconnect(msg: string) {
    this.logger.info(`We logged off: ${msg}`);
    update(this);
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

  get online() {
    return !!this.client.steamID;
  }

  serialize() {
    return serializer(this);
  }
}
