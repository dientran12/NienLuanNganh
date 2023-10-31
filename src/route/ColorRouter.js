const express = require('express');
const router = express.Router();
const colorController = require('../controller/colorController');

// Tạo màu mới
router.post('/create', colorController.createColor);
// Lấy tất cả màu
router.get('/get-all', colorController.getAllColors);
// Xóa màu theo id
router.delete('/delete/:id', colorController.deleteColorById);
// Lấy sản phẩm theo id của màu
router.get('/get-products-by-color/:id', colorController.getProductsByColor);
// Lấy chi tiết màu
router.get('/get-by-id/:id', colorController.getColorById);
// Lấy màu theo tên
router.get('/get-by-name/:name', colorController.getColorByName);
// Cập nhật màu sắc
router.put('/update/:id', colorController.updateColor);

module.exports = router;
