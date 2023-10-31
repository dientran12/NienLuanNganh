import express from 'express';
//import authMiddleware from '../middleware/authUserMiddleware.js';
import productController from '../controller/productController.js';
import progoriesController from '../controller/categotriesController.js';


const router = express.Router();

// Tạo sản phẩm mới
router.post('/create', productController.createProduct);
// Xóa sản phẩm theo ID
router.delete('/delete/:id', productController.deleteProductById);
// Lấy tất cả sản phẩm
router.get('/get-all', productController.getAllProducts);
// Lấy tất cả sản phẩm và phân trang theo yêu cầu
router.get('/get-product-on-page', productController.getAllProductsOnPage);
// Lấy chi tiết sản phẩm theo ID
router.get('/get-product-by-id/:id', productController.getProductDetail);
// Lấy sản phẩm theo tên
router.get('/search', productController.getProductByName);
// Lấy sản phẩm theo loại
router.get('/get-By-Type', productController.getByType);
// Tìm sản phẩm theo mức giá
router.get('/get-By-Price-Range', productController.findProductsByPriceRange);
// Cập nhật thông tin sản phẩm
router.put('/update/:productId', productController.updateProduct);
// Lấy sản phẩm theo giá từ thấp tới cao
router.get('/get-price-low-to-high', productController.getPricesLowToHigh);
// Lấy sản phẩm theo giá từ cao tới thấp
router.get('/get-price-high-to-low', productController.getPricesHighToLow);
// Lấy số lượng sản phẩm theo id
router.get('/get-total-quantity/:productId', productController.getTotalQuantityForProductController);
// Lấy số lượng với version cụ thể
router.get('/get-quantity-version/:productId/:colorId/:sizeId', productController.getQuantityVersion);
// Lấy tất cả type
router.get('/get-all-type', productController.getAllUniqueTypes);
// Lấy tất cả brand
router.get('/get-all-brand', productController.getAllUniqueBrand);
// Lấy tất cả origin
router.get('/get-all-origin', productController.getAllUniqueOrigin);

module.exports = router;
