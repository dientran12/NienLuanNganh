import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import ProductController from '../controller/productController.js';

const router = express.Router();

router.get('/display/', ProductController.getAllProducts);
router.get('/displaydetail/:id', ProductController.getProductById);
router.post('/create/', authMiddleware.adminAuth, ProductController.createProduct);
router.put('/update/:id', authMiddleware.adminAuth, ProductController.updateProduct);
router.delete('/delete/:id', authMiddleware.adminAuth, ProductController.deleteProduct);

export default router;
