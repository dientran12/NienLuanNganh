const express = require('express');
const router = express.Router();
const sizeItemController = require('../controller/sizeItemController');

// Cập nhật SizeItem
router.put('/update-sizeitem/:id', sizeItemController.updateSizeItem);
// Chỉnh sửa quantity cho SizeItem
router.put('/update-sizequantity/:id', sizeItemController.updateSizeItemQuantity);
// Xóa SizeItem
router.delete('/delete-sizeitem/:id', sizeItemController.removeSizeItemByVersionAndSizeId);
// Thêm SizeItem
router.post('/add-sizeitem', sizeItemController.addSizeItem);
// Lấy số lượng từ id của SizeItem
router.get('/get-quantity/:id', sizeItemController.getQuantity);
// Lấy tổng số lượng dựa trên versionId
router.get('/get-total-quantity/:versionId', sizeItemController.getTotalQuantityByVersionId);
// Lấy chi tiết SizeItem
router.get('/get-detail/:id', sizeItemController.getSizeItemDetails);;

module.exports = router;