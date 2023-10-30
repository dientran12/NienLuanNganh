const express = require('express');
const router = express.Router();
import categoriesController from '../controller/categotriesController.js';

router.post('/create', categoriesController.createCategory);// Tạo danh mục mới
// Xóa danh mục theo ID
router.delete('/delete/:id', categoriesController.deleteCategory);
// Cập nhật danh mục
router.put('/update/:id', categoriesController.updateCategory);
// Lấy tất cả sản phẩm thuộc danh mục
router.get('/get-by-category/:id', categoriesController.getProductsByCategory);
// Thêm sản phẩm vào danh mục
router.post('/add-product', categoriesController.addProductToCategory);
// Lấy tất cả danh mục
router.get('/get-all', categoriesController.getAllCategories);
// Xóa sản phẩm khỏi danh mục
router.delete('/delete-product/:categoryId/IdProducts/:productId', categoriesController.removeProductFromCategory);

module.exports = router;