// routes/orderRouter.js
import express from 'express';
import { addtoOrder } from '../controller/OrderController';
import { cancelOrderController } from '../controller/OrderController';
import { moveFromCartToNewOrderController } from '../controller/OrderController';
import { confirmOrder } from '../controller/OrderController';
import { getTotalForMonth } from '../controller/OrderController';
import {updateorder} from '../controller/OrderController';
import {getAllorderDetail} from '../controller/OrderController'
const { addMultipleToOrderController } = require('../controller/OrderController');
const router = express.Router();

// //thêm sản phẩm vào đơn hàng bằng sizeiemid
// router.post('/addProduct/:userId', addtoOrder);

// // chỉnh sửa đơn hàng
// router.post('/updateorder/:orderId/:sizeItemId', updateorder)

//hủy đơn hàng (xóa đơn hàng)
router.delete('/cancel/:orderId', cancelOrderController);

// //thêm sản phẩm từ giỏ hàng bằng cartiemid
// router.post('/moveMultipleFromCartToOrder', moveFromCartToNewOrderController);

//xác nhận đơn hàng và gửi mail xác nhận, cập nhật trạng thái, số lượng sản phẩm còn lại và cập nhật số sản phẩm đã bán
router.post('/confirmOrder/:orderId', confirmOrder);

//xem số đơn hàng đã bán và tổng giá trị trong tháng
router.get('/orders/total', getTotalForMonth);

//xem lịch sử đơn hàng (tất cả sản phẩm trong đơn hàng)
router.get('/getallorder/:userId', getAllorderDetail)

// Định nghĩa tuyến đường để thêm nhiều sản phẩm vào đơn hàng
router.post('/add-multiple-to-order', addMultipleToOrderController);

export default router;
