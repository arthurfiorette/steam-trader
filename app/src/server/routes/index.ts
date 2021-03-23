import { Express } from 'express';
import users from './users';
import ping from './ping';

export default function apply(app: Express) {
  app.use('/users', users);
  app.use('/ping', ping);
}
