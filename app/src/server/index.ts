import express from 'express';
import cors from 'cors';
import setRoutes from './routes';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { logger } from '../logger';

const origin = `http://localhost:${process.env.PORT || 1227}`;

const app = express();
const http = createServer(app);
export const io = new Server(http, { cors: { origin } });

app.use(cors());

setRoutes(app);

io.on('connection', (socket) => {
  logger.debug(`Socket '${socket.id}' connected`);
  socket.on('disconnect', () =>
    logger.debug(`Socket '${socket.id}' disconnected`)
  );
});

export default http;
