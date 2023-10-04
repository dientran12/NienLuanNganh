import express from 'express';
import authMiddleware from '../middleware/authUserMiddleware.js';
import ProductController from '../controller/productController.js';
//import { Model } from 'sequelize';

const router = express.Router();

// Định tuyến yêu cầu tới các phương thức trong controllerProduct
router.post('/products', authMiddleware.adminAuth, ProductController.create);
router.delete('/products/:id', authMiddleware.adminAuth, ProductController.delete);
router.put('/products/:id', authMiddleware.adminAuth, ProductController.update);
router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getDetail);
router.get('/products/name/:name', ProductController.getByName);
router.get('/products/type/:type', ProductController.getByType);

module.exports = router;
