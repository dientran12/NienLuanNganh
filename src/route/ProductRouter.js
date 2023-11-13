import express from 'express';
//import authMiddleware from '../middleware/authUserMiddleware.js';
import productController from '../controller/productController.js';
import progoriesController from '../controller/categotriesController.js';


const router = express.Router();

// Tạo sản phẩm mới
router.post('/create', productController.createProduct);
// Xóa sản phẩm theo ID
router.delete('/delete/:id', productController.deleteProductById);
// Lấy tất cả sản phẩm cho admin
router.get('/get-all-for-admin', productController.getAllProducts);
// Lấy tất cả sản phẩm cho admin (sắp xếp theo ngày tạo cũ đến mới)
router.get('/get-all-for-admin-old', productController.getAllProductsOld);
// Lấy tất cả sản phẩm cho admin (sắp xếp theo ngày tạo mới đến cũ)
router.get('/get-all-for-admin-new', productController.getAllProductsNew);
// Lấy tất cả sản phẩm cho customer
router.get('/get-all-for-customer', productController.getAllProductsCustomer);
// Lấy tất cả sản phẩm và phân trang theo yêu cầu
router.get('/get-product-on-page', productController.getAllProductsOnPage);
// Lấy chi tiết sản phẩm theo ID 
router.get('/get-product-by-id/:id', productController.getProductDetail);
// Cập nhật thông tin sản phẩm 
router.put('/update/:productId', productController.updateProduct);
// Lấy sản phẩm theo giá từ thấp tới cao
router.get('/get-price-low-to-high', productController.getPricesLowToHigh);
// Lấy sản phẩm theo giá từ cao tới thấp
router.get('/get-price-high-to-low', productController.getPricesHighToLow);
// Lấy danh sách type
router.get('/get-all-type', productController.getAllUniqueTypes);
// Lấy danh sách brand
router.get('/get-all-brand', productController.getAllUniqueBrand);
// Lấy danh sách origin
router.get('/get-all-origin', productController.getAllUniqueOrigin);
// Lấy sản phẩm theo tên
router.get('/search', productController.getProductByName);
// Lấy sản phẩm theo loại
router.get('/get-by-type', productController.getByType);
// Lấy sản phẩm theo brand
router.get('/get-by-brand', productController.getByBrand);
// Lấy sản phẩm theo origin
router.get('/get-by-origin', productController.getByOrigin);
// Lấy sản phẩm theo tên (có ảnh)
router.get('/search-have-image', productController.getProductByNameWithImage);
// Lấy sản phẩm theo loại (có ảnh)
router.get('/get-by-type-have-image', productController.getByTypeHaveImage);
// Lấy sản phẩm theo brand (có ảnh)
router.get('/get-by-brand-have-image', productController.getByBrandHaveImage);
// Lấy sản phẩm theo origin (có ảnh)
router.get('/get-by-origin-have-image', productController.getByOriginHaveImage);
// Lấy sản phẩm theo gender (có ảnh)
router.get('/get-by-gender-have-image', productController.getByGenderHaveImage);
// Lấy tất cả sản phẩm còn khuyến mãi
router.get('/get-all-in-promotion', productController.getAllProductsInPromotion);
// Lấy tất cả sản phẩm chưa có khuyến mãi
router.get('/get-all-no-promotion', productController.getAllProductsNoPromotion);
// Lấy tất cả sản phẩm còn trong thời gian khuyến mãi cho customer
router.get('/get-all-for-customer-in-promotion', productController.getAllProductsInPromotionCustomer);

module.exports = router;

// // Lấy số lượng sản phẩm theo id 
// router.get('/get-total-quantity/:productId', productController.getTotalQuantityForProductController);
// // Lấy số lượng với version cụ thể +++
// router.get('/get-quantity-version/:productId/:colorId/:sizeId', productController.getQuantityVersion);
