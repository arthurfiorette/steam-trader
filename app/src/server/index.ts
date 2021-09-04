import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from '../logger';
import setRoutes from './routes';

const { CORS = 'http://localhost:1227' } = process.env;

const app = express();
const http = createServer(app);
export const io = new Server(http, {
  cors: { origin: CORS }
});

app.use(cors({ origin: CORS }));

setRoutes(app);

io.on('connection', (socket) => {
  logger.debug(`Socket '${socket.id}' connected`);
  socket.on('disconnect', () => logger.debug(`Socket '${socket.id}' disconnected`));
});

export default http;
