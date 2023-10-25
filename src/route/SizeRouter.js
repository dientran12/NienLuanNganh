const express = require('express');
const router = express.Router();
const sizeController = require('../controller/sizeController');

// Route để tạo mới một size
// router.post('/create', sizeController.createSize);

// Route để lấy tất cả các sizes
// router.get('/all', sizeController.getAllSizes);

// Route để lấy size theo ID
// router.get('/getById/:id', sizeController.getSizeById);

// Route để cập nhật thông tin của một size
// router.put('/update/:id', sizeController.updateSize);

// Route để xóa size theo ID
// router.delete('/delete/:id', sizeController.deleteSizeById);

// Route để lấy các sản phẩm dựa trên size
// router.get('/:id/products', sizeController.getProductsBySize);

module.exports = router;
