import config from '../config.json';
import { info, Ad } from './logger';
import Account from './account/account';

Ad.startup();

const account = new Account(config);

account.login().then(() => console.log('logged in'));
