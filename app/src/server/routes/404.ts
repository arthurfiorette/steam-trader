import { Router, json } from 'express';

const router = Router();

router.use(json());

router.use((_req, res) => res.send([false, 'Not Found', 404]));

export default router;