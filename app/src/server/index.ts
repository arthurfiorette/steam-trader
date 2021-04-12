import express from 'express';
import cors from 'cors';
import setRoutes from './routes';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { logger } from '../logger';

const app = express();
const http = createServer(app);
export const io = new Server(http, { cors: { origin: process.env.CORS } });

app.use(cors({ origin: process.env.CORS }));

setRoutes(app);

io.on('connection', (socket) => {
  logger.debug(`Socket '${socket.id}' connected`);
  socket.on('disconnect', () =>
    logger.debug(`Socket '${socket.id}' disconnected`)
  );
});

export default http;
