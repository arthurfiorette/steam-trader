import { Router, json } from 'express';
import { getAll, getByName, create, edit, remove } from '../../accounts/controller';

const router = Router();

router.use(json());

router.get('/', (_req, res) => res.send(getAll()));

router.post('/', (req, res) => res.send(create(req.body)));

router.get('/:name', (req, res) => res.send(getByName(req.params.name)));

router.put('/:name', (req, res) => res.send(edit(req.params.name, req.body)));

router.delete('/:name', (req, res) => res.send(remove(req.params.name)));

export default router;
