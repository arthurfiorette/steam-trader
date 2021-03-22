import { Router, json } from 'express';
import { accounts } from '../controller';
import { response } from './responses';

export function Accounts() {
  const router = Router();

  router.use(json());

  router.get('/', (req, res) => {
    res.send(response(accounts.getAll()));
  });

  return router;
}
