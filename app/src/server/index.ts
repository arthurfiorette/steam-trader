import express from 'express';
import cors from 'cors';
import setRoutes from './routes';

const app = express();

app.use(cors());
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function ([status, response]: [boolean, any]) {
    res.send = oldSend;
    return res.send({
      status: status ? 'Success' : 'Failure',
      timestamp: new Date().toLocaleString(),
      response
    });
  };
  next();
});

setRoutes(app);

export default app;
