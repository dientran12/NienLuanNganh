import express from 'express';
import { getOrderInfo } from '../controller/OrderController.js';
import { addToOrder } from '../controller/OrderController.js';
import { calculateOrderTotal } from '../controller/OrderController.js';
import { deleteOrder } from '../controller/OrderController.js';
import { confirmOrder } from '../controller/OrderController.js';
import { setPaymentMethod } from '../controller/OrderController.js';
import { updateOrderById } from '../controller/OrderController.js';
const router = express.Router();



router.get('/getOrderInfo/:id', getOrderInfo);
router.post('/addToOrder/:cartItemID', addToOrder);
router.get('/calculate-total/:cartItemId', calculateOrderTotal);
router.delete('/deleteOrder/:id', deleteOrder);
router.put('/confirmOrder/:id', confirmOrder);
router.post('/setPaymentMethod/:id', setPaymentMethod);
router.put('/updateOrderById/:orderId', updateOrderById);

export default router;
