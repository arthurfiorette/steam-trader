import express from 'express';
import cors from 'cors';
import setRoutes from './routes';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { logger, socketTransport } from '../logger';
import { setServer } from '../transactions/serializer';
import { socketUpdater } from './socket/updater';

const origin = `http://localhost:${process.env.PORT || 1227}`;

const app = express();
const http = createServer(app);
const io = new Server(http, { cors: { origin } });

// TODO: Clean and recode socket handlers
socketTransport.server = io;
setServer(io);
socketUpdater.server = io;

app.use(cors());

setRoutes(app);

io.on('connection', (socket) => {
  logger.debug(`Socket '${socket.id}' connected`);

  socket.on('disconnect', () => logger.debug(`Socket '${socket.id}' disconnected`));
});

export default http;
