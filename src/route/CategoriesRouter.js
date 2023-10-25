const express = require('express');
const router = express.Router();
import categoriesController from '../controller/categotriesController.js';

router.post('/create', categoriesController.createCategory);// Tạo danh mục mới
// Xóa danh mục theo ID
router.delete('/delete/:id', categoriesController.deleteCategory);
// Lấy tất cả sản phẩm thuộc danh mục
router.get('/getProductById/:categoryId', categoriesController.getProductsByCategory);
// Thêm sản phẩm vào danh mục
router.post('/addProduct', categoriesController.addProductToCategory);
// Lấy tất cả danh mục
router.get('/getAll', categoriesController.getAllCategories);
// Xóa sản phẩm khỏi danh mục
router.delete('/deleteProduct/:categoryId/IdProducts/:productId', categoriesController.removeProductFromCategory);

module.exports = router;