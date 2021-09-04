import { Express, NextFunction, Request, Response } from 'express';
import _404 from './404';
import ping from './ping';
import users from './users';

export default function apply(app: Express) {
  app.use(responsePattern);
  app.use('/users', users);
  app.use('/ping', ping);
  app.use(_404);
}

function responsePattern(_req: Request, res: Response, next: NextFunction) {
  const oldSend = res.send;
  res.send = function ([status, response, code = 200]: [boolean, any, number?]) {
    res.send = oldSend;
    return res.status(code).send({
      status: status ? 'Success' : 'Failure',
      timestamp: new Date().toISOString(),
      response
    });
  };
  next();
}
