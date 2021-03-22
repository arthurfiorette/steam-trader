import config from '../config.json';
import * as Ads from './ads';
import Account from './account/account';

import express from 'express';
import cors from 'cors';

import { Accounts } from './routes';

Ads.startup();

// const account = new Account(config);

// account.login();

const app = express();

app.use(cors());
app.use('/users', Accounts());

app.listen(process.env.PORT);
