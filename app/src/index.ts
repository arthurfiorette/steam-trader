import dotenv from 'dotenv';
dotenv.config();

import server from './server';
import * as Ads from './ads';

const PORT = process.env.PORT || 1228;

Ads.startup();

server.listen(PORT, () => Ads.listening(PORT));
