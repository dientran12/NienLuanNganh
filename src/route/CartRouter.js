import * as CartItemControllers from '../controller/CartItemControllers.js';
import * as CartControllers from '../controller/CartControllers.js';
import express from 'express'

const router = express.Router();

// chức năng thêm sản phẩm vào giỏ hàng bằng sizeitemid
router.post('/addtocart', CartItemControllers.addtocartitem)

// chỉnh sửa giỏ hàng
router.post('/updatecart/:userId/:sizeItemId', CartItemControllers.updatecart)

//xóa sản phẩm ra khỏi giỏ hàng
router.delete('/deletecart/:userId/:sizeItemId', CartItemControllers.deletecart)

//xem thông tin chi tiết sản phẩm trong giỏ hàng
router.get('/getcartitem/:id', CartItemControllers.getCartItem)

//xem thông tin giỏ hàng
router.get('/getCart/:id', CartControllers.getCart)

//xem giỏ hàng (tất cả sản phẩm trong giỏ hàng)
router.get('/getalldata/:userId', CartItemControllers.getAllCartItemController)

module.exports = router