const express = require('express');
const router = express.Router();
const promotionController = require('../controller/promotionController');
const productController = require('../controller/productController');
// const authMiddleware = require('../middleware/authUserMiddleware');

// Lấy tất cả khuyến mãi
router.get('/get-all', promotionController.getAllPromotions);
// Lấy chi tiết khuyến mãi
router.get('/get-by-id/:id', promotionController.getPromotionById);
// Tạo khuyến mãi
router.post('/create', promotionController.createPromotion);
// Cập nhật khuyến mãi
router.put('/update/:id', promotionController.updatePromotion);
// Xóa khuyến mãi
router.delete('/delete/:id', promotionController.deletePromotion);

// Áp dụng khuyến mãi cho sản phẩm thông qua id
router.post('/products/:productId/promotions/:promotionId', promotionController.applyPromotionToProduct);

// test
// router.get('/get-productpromotion-by-productid/:id', promotionController.getProductPromotionById);

module.exports = router;
