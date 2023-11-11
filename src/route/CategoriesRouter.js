const express = require('express');
const router = express.Router();
import categoriesController from '../controller/categotriesController.js';

// Tạo danh mục mới
router.post('/create', categoriesController.createCategory);
// Xóa danh mục theo ID
router.delete('/delete/:id', categoriesController.deleteCategory);
// Cập nhật danh mục
router.put('/update/:id', categoriesController.updateCategory);
// Lấy tất cả sản phẩm với id danh mục
router.get('/get-by-category/:id', categoriesController.getProductsByCategory);
// Lấy tất cả danh mục với id sản phẩm
router.get('/get-by-product/:id', categoriesController.getCategoryByProduct);
// Thêm các danh mục cho sản phẩm
router.post('/add-category-to-product', categoriesController.addProductToCategory);
// Lấy tất cả danh mục
router.get('/get-all', categoriesController.getAllCategories);
// Lấy chi tiết danh mục
router.get('/get-by-id/:id', categoriesController.getCategoryById);
// Xóa sản phẩm khỏi danh mục
router.delete('/delete-product-from-category/:categoryId/IdProducts/:productId', categoriesController.removeProductFromCategory);

// /delete-product-from-category?productId="uuuuu"&categoryId="paruiuhu"
module.exports = router;