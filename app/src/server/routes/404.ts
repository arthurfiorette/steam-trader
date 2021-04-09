import { Router, json } from 'express';

const router = Router();

router.use(json());

router.use((_req, res) =>
  res.send([false, `${_req.path} does not exist`, 404])
);

export default router;
