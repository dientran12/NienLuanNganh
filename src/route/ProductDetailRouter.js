const express = require('express');
const router = express.Router();
const upload = require('../public/uploads/multer');
const path = require('path');
const productDetailController = require('../controller/productDetailController');

router.post('/createDetail', upload.single('image'), productDetailController.createProductDetail);
router.get('/all', productDetailController.getAllProductDetails);
router.get('/:id', express.static(path.join(__dirname, 'public')), productDetailController.getProductDetailById);
router.put('/:id/update', upload.single('image'), productDetailController.updateProductDetail);
router.delete('/:id/delete', productDetailController.deleteProductDetailById);

module.exports = router;
