const express = require('express');
const router = express.Router();
const productDetailController = require('../controller/productDetailController');

router.post('/createDetail', productDetailController.createProductDetail);
router.get('/all', productDetailController.getAllProductDetails);
router.get('/:id', productDetailController.getProductDetailById);
router.put('/:id/update', productDetailController.updateProductDetail);
router.delete('/:id/delete', productDetailController.deleteProductDetailById);

module.exports = router;
