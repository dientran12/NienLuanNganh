const express = require('express');
const router = express.Router();
const upload = require('../public/uploads/multer');
const path = require('path');
const productDetailController = require('../controller/productDetailController');

router.post('/create', upload.single('image'), productDetailController.createProductDetail);
router.get('/all', productDetailController.getAllProductDetails);
router.get('/:id', express.static(path.join(__dirname, 'public')), productDetailController.getProductDetailById);
router.put('/update/:id', upload.single('image'), productDetailController.updateProductDetail);
router.delete('/delete/:id', productDetailController.deleteProductDetailById);

module.exports = router;
