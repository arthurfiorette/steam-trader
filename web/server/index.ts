import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });
const { PORT, STATIC_AGE } = process.env;

const dist = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(express.static(dist, { maxAge: STATIC_AGE }));

app.get('/', (_, res) => res.sendFile(path.resolve(dist, 'index.html')));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
