import dotenv from 'dotenv';
import * as Ads from './ads';
import server from './server';
dotenv.config();

const PORT = process.env.PORT || 1228;

Ads.startup();

server.listen(PORT, () => Ads.listening(PORT));
