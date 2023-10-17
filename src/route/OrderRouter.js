// Trong orderRouter.js
import express from 'express';
import { addOrder } from '../controller/OrderController.js';

const router = express.Router();

// Định tuyến cho việc tạo đơn hàng
router.post('/add', addOrder);

// Các định tuyến khác liên quan đến quản lý đơn hàng

export default router;
