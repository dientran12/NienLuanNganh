// routes/orderRouter.js
import express from 'express';
import { addtoOrder } from '../controller/OrderController';
import { cancelOrderController } from '../controller/OrderController';
import { moveFromCartToNewOrderController } from '../controller/OrderController';
import { confirmOrder } from '../controller/OrderController';
import { getTotalForMonth } from '../controller/OrderController';
const router = express.Router();

router.post('/addProduct/:userId', addtoOrder);
router.delete('/cancel/:orderId', cancelOrderController);
router.post('/moveMultipleFromCartToOrder', moveFromCartToNewOrderController);
router.post('/confirmOrder/:orderId', confirmOrder);
router.get('/orders/total', getTotalForMonth);

export default router;
