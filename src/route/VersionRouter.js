const express = require('express');
const router = express.Router();
const upload = require('../public/uploads/multer');
const path = require('path');
const productDetailController = require('../controller/versionController');

// Tạo version
router.post('/create', productDetailController.createProductDetail);
// lấy tất cả version
router.get('/get-all', productDetailController.getAllProductDetails);
// Lấy version theo id của version
router.get('/get-version-by-id/:id', productDetailController.getProductDetailById);
// Cập nhật version
router.put('/update/:id', productDetailController.updateProductDetail);
// Xóa version theo id
router.delete('/delete/:id', productDetailController.deleteProductDetailById);
// Lấy tất cả version theo id của sản phẩm
router.get('/get-all-version/:productId', productDetailController.getAllVersionsByProductId);

module.exports = router;
