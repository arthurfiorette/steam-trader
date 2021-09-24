import { json, Router } from 'express';
import {
  create,
  edit,
  getAll,
  getByName,
  login,
  logout,
  remove
} from '../../accounts/controller';

const router = Router();

router.use(json());

router.get('/', (_req, res) => res.send(getAll()));

router.post('/', (req, res) => res.send(create(req.body)));

router.get('/:name', (req, res) => res.send(getByName(req.params.name)));

router.put('/:name', (req, res) => res.send(edit(req.params.name, req.body)));

router.delete('/:name', (req, res) => res.send(remove(req.params.name)));

router.post('/:name/login', (req, res) => res.send(login(req.params.name)));

router.post('/:name/logout', (req, res) => res.send(logout(req.params.name)));

export default router;
