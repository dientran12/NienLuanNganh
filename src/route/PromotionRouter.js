const express = require('express');
const router = express.Router();
const promotionController = require('../controller/promotionController');
const productController = require('../controller/productController');
// const authMiddleware = require('../middleware/authUserMiddleware');

// Routes for promotions
router.get('/getAll', promotionController.getAllPromotions);
router.post('/create', promotionController.createPromotion);
router.put('/update/:promotionId', promotionController.updatePromotion);
router.delete('/delete/:promotionId', promotionController.deletePromotion);

// Route for applying promotion to a product
router.post('/products/:productId/promotions/:promotionId', promotionController.applyPromotionToProduct);

module.exports = router;
