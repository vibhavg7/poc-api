import { Router } from 'express';
import { IndexWelcome } from '../controllers/index.controller';
const router = Router();

router.route('/')
      .get(IndexWelcome);
export default router;