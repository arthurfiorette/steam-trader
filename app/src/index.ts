import * as Ads from './ads';
import app from './server';

const PORT = process.env.PORT || 1228;

Ads.startup();

app.listen(PORT, () => Ads.listening(PORT));
