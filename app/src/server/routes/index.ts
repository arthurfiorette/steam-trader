import { Express, NextFunction, Request, Response } from 'express';
import users from './users';
import ping from './ping';

export default function apply(app: Express) {
  app.use('/users', users);
  app.use('/ping', ping);
  app.use(responsePattern());
}

function responsePattern() {
  return (_req: Request, res: Response, next: NextFunction) => {
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
  };
}
