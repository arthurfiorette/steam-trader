import { nextTick } from 'process';
import SteamTotp from 'steam-totp';
import TradeOfferManager from 'steam-tradeoffer-manager';
import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';
import createLogger from '../logger';
import { update } from '../server/socket/updater';
import { CurrencyId, CurrencyIdKey } from '../steam/currency';
import TradeProcessor from '../transactions/processor';
import { Offer } from '../transactions/types';
import { AccountOptions } from './options';
import { serializer } from './serializer';

export default class Account {
  readonly client = new SteamUser();
  readonly community = new SteamCommunity();
  readonly manager = new TradeOfferManager({
    steam: this.client,
    community: this.community,
    language: 'en'

    // Needed because declarator doesn't detects automatically.
  }) as TradeOfferManager & NodeJS.EventEmitter;

  readonly trader = new TradeProcessor(this);
  readonly logger;

  constructor(readonly options: AccountOptions) {
    this.logger = createLogger(options.login.username);
    this.logger.info(`'${options.login.username}' was created, waiting for login...`);

    // Initialization handlers
    this.client.on('webSession', this.onWebSession);
    this.client.on('wallet', this.onWallet);
    this.client.on('error', this.onError);

    // Auth handlers
    this.client.on('loggedOn', this.onLoggedOn);
    this.client.on('disconnected', this.onDisconnect);
    this.client.on('steamGuard', this.onSteamGuard);

    // Trade offers
    this.manager.on('newOffer', this.onNewOffer);
  }

  login = () => {
    this.logger.info('Attempting to logging In');
    if (this.online) {
      this.logger.warn('Login attempt, but we are already logged in');
      return;
    }

    this.client.logOn({
      accountName: this.options.login.username,
      password: this.options.login.password,
      twoFactorCode: this.getAuthCode(),
      machineName: 'steam-trader'
    });
  };

  logoff = () => {
    this.logger.info(`Attempting to log Off`);
    if (!this.online) {
      this.logger.warn('Logoff attempt, but we are already logged off');
      return;
    }
    this.client.logOff();
  };

  private onLoggedOn = (
    _details: Record<string, any>,
    _parental: Record<string, any>
  ) => {
    this.logger.info('We logged in');
    this.client.setPersona(1);

    if (this.options.status.gameId !== -1) {
      this.client.gamesPlayed(Number(this.options.status.gameId));
    }

    this.update();
  };

  private onDisconnect = (resultId: SteamUser.EResult, msg: string | undefined) => {
    this.logger.info(`We logged off (${resultId}): ${msg}`);
    this.update();
  };

  private onWebSession = (_sessionId: string, cookies: string[]) => {
    this.logger.debug('Started web session, delivering cookies');

    this.manager.setCookies(cookies, undefined, undefined);
    this.community.setCookies(cookies);

    // TODO: Migrate to new API (https://github.com/DoctorMcKay/node-steamcommunity/wiki/Steam-Confirmation-Polling#this-is-deprecated)
    this.community.startConfirmationChecker(
      11_000 /* Rate limit less than 10 seconds */,
      this.options.login.identity
    );
  };

  private onSteamGuard = async (
    _domain: string | null,
    callback: (code: string) => void
  ) => {
    const auth = this.getAuthCode();
    await callback(auth);
    this.logger.debug(`Requested steam guard. Returned ${auth}`);
  };

  private onWallet = (_hasWallet: boolean, currencyId: SteamUser.ECurrencyCode) => {
    const name = CurrencyId[currencyId] as CurrencyIdKey | undefined;

    if (!name) {
      throw new Error(`Currency ${currencyId} unrecognized`);
    }

    this.logger.debug(`The currency used is '${name}'`);

    this.options.status.currency = name;
  };

  private onError = (err: Error) => {
    this.logger.error(`Occurred an error on the last operation: ${err}`);
  };

  private getAuthCode = () => {
    const { sharedSecret } = this.options.login;
    const auth = SteamTotp.generateAuthCode(sharedSecret);
    this.logger.debug(`Requested steam guard auth code '${auth}'`);
    return auth;
  };

  private onNewOffer = async (offer: Offer) => {
    this.trader.begin(offer);
  };

  get online() {
    return !!this.client.steamID;
  }

  update = () => {
    nextTick(() => update(this));
  };

  serialize = () => {
    return serializer(this);
  };
}
