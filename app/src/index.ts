import config from '../config.json';
import * as Ads from './ads';
import Account from './account/account';

Ads.startup();

const account = new Account(config);

account.login();
