import dotenv from 'dotenv';
import * as Ads from './ads';
import server from './server';
dotenv.config();

const { PORT = 1228 } = process.env;

Ads.startup();

server.listen(PORT, () => Ads.listening(PORT));
