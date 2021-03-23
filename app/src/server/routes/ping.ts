import { Router, json } from 'express';

const router = Router();

router.use(json());

router.use('/', (req, res) => res.send([true, 'Pong']));

export default router;
