const express = require('express');
const router = express.Router();
const colorController = require('../controller/colorController');

// Định nghĩa các routes cho colorController
router.post('/create', colorController.createColor);
router.get('/get-all', colorController.getAllColors);
router.delete('/delete/:id', colorController.deleteColorById);
router.get('/get-products-by-color/:id', colorController.getProductsByColor);
router.get('/get-by-id/:id', colorController.getColorById);
router.get('/get-by-name/:name', colorController.getColorByName);
router.put('/update/:id', colorController.updateColor);

module.exports = router;
