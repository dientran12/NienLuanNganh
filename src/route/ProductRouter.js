import express from 'express';
//import authMiddleware from '../middleware/authUserMiddleware.js';
import productController from '../controller/productController.js';
import promotionController from '../controller/promotionController.js';
import categoriesController from '../controller/categotriesController.js';


const router = express.Router();

// Tạo sản phẩm mới
router.post('/create', productController.createProduct);
// Xóa sản phẩm theo ID
router.delete('/deleteProduct/:idProduct', productController.deleteProductById);
// Lấy tất cả sản phẩm
router.get('/getAll', productController.getAllProducts);
// Lấy tất cả sản phẩm và phân trang theo yêu cầu
router.get('/getProductOnPage', productController.getAllProductsOnPage);
// Lấy chi tiết sản phẩm theo ID
router.get('/getProductBy/:productId', productController.getProductDetail);
// Lấy sản phẩm theo tên
router.get('/getProductByName', productController.getProductByName);
// Lấy sản phẩm theo loại
router.get('/getProductByType/:type', productController.getByType);
// Tìm sản phẩm theo mức giá
router.get('/findProductByPrice', productController.findProductsByPriceRange);
// Cập nhật thông tin sản phẩm
router.put('/updateProducts/:productId', productController.updateProduct);



module.exports = router;
