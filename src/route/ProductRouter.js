import express from 'express';
//import authMiddleware from '../middleware/authUserMiddleware.js';
import productController from '../controller/productController.js';
import promotionController from '../controller/promotionController.js';
import categoriesController from '../controller/categotriesController.js';


const router = express.Router();


// router.post('/products', ProductController.createProduct);// Tạo sản phẩm mới name, description, type, price, origin, brand, gender
// router.put('/products', authMiddleware.adminAuth, ProductController.updateProduct);// Cập nhật sản phẩm productId, name, description, type, price, origin, brand, gender, colors, sizes, quantities
// router.post('/productsSize/:name', ProductController.createSize);// Thêm size
// router.post('/productsColor/:name', ProductController.createColor);// Thêm màu
// router.post('/productsAddSizeColor/', ProductController.addSizeAndColorToProduct);// Thêm màu và size cho sản phẩm
// router.delete('/products/:productId', authMiddleware.adminAuth, ProductController.deleteProductById);// Xóa sản phẩm theo id
// router.get('/products', ProductController.getAllProducts);// Lây danh sách tất cả các sản phẩm
// router.get('/products/:id', ProductController.getProductDetail);// Lấy thông tin chi tiết sản phẩm theo id
// router.get('/products/name/:name', ProductController. getProductByName);// Lấy thông tin chi tiết sản phẩm theo tên
// router.get('/products/type/:type', ProductController.getByType);// Lấy thông tin sản phẩm theo loại
// router.get('/products', ProductController.findProductsByPriceRange);// Tìm sản phẩm theo mức giá minPrice và maxPrice
// router.post('/productsQuantity', ProductController.addQuantityToProduct);

router.post('/promotions', promotionController.createPromotion);//Thêm khuyến mãi name, percentage, startDate, endDate
router.delete('/promotions/:id', promotionController.deletePromotion);// Xóa khuyến mãi theo id

// Tạo sản phẩm mới
router.post('/products', productController.createProduct);
// Xóa sản phẩm theo ID
router.delete('/products/:productId', productController.deleteProductById);
// Lấy tất cả sản phẩm
router.get('/products', productController.getAllProducts);
// Lấy chi tiết sản phẩm theo ID
router.get('/products/:id', productController.getProductDetail);
// Lấy sản phẩm theo tên
router.get('/products/name/:name', productController.getProductByName);
// Lấy sản phẩm theo loại
router.get('/products/type/:type', productController.getByType);
// Tìm sản phẩm theo mức giá
router.get('/products/price', productController.findProductsByPriceRange);
// Thêm kích thước và màu cho sản phẩm
router.post('/products/:productId/size-color', productController.addSizeAndColorToProduct);
// Cập nhật thông tin sản phẩm
router.put('/products/:productId', productController.updateProduct);
// Thêm số lượng cho sản phẩm theo tên, màu sắc và kích thước
router.post('/products/quantity', productController.addQuantityToProduct);
// Áp dụng khuyến mãi cho sản phẩm
router.post('/products/applyPromotion', productController.applyPromotion);



router.post('/categories', categoriesController.createCategory);// Tạo danh mục mới
// Xóa danh mục theo ID
router.delete('/categories/:id', categoriesController.deleteCategory);
// Lấy tất cả sản phẩm thuộc danh mục
router.get('/categories/:categoryId/products', categoriesController.getProductsByCategory);
// Thêm sản phẩm vào danh mục
router.post('/addProductToCategories', categoriesController.addProductToCategory);
// Lấy tất cả danh mục
router.get('/categories', categoriesController.getAllCategories);
// Xóa sản phẩm khỏi danh mục
router.delete('/categories/:categoryId/products/:productId', categoriesController.removeProductFromCategory);

module.exports = router;
