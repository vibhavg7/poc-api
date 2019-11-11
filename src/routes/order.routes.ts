import { Router } from 'express';
import {
    fetchOrderDetailsById
} from '../controllers/order.controller';
const router = Router();

router.route('/:orderId')
    .get(fetchOrderDetailsById);


export default router;