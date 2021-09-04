import { json, Router } from 'express';

const router = Router();

router.use(json());

router.use((req, res) => res.send([false, `${req.path} does not exist`, 404]));

export default router;
