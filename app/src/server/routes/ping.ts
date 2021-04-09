import { Router, json } from 'express';

const router = Router();

router.use(json());

router.use('/', (_req, res) => res.send([true, 'Pong']));

export default router;
