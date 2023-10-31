const express = require('express');
const router = express.Router();
const upload = require('../public/uploads/multer');
const path = require('path');
const productDetailController = require('../controller/productDetailController');

// Tạo chi tiết sản phẩm
router.post('/create', upload.single('image'), productDetailController.createProductDetail);
// lấy tất cả chi tiết sản phẩm
router.get('/all', productDetailController.getAllProductDetails);
// Lấy chi tiết sản phẩm theo id của chi tiết sản phẩm
router.get('/:id', express.static(path.join(__dirname, 'public')), productDetailController.getProductDetailById);
// Cập nhật chi tiết sản phẩm
router.put('/update/:id', upload.single('image'), productDetailController.updateProductDetail);
// Xóa chi tiết sản phẩm theo id của chi tiết sản phẩm 
router.delete('/delete/:id', productDetailController.deleteProductDetailById);

module.exports = router;
