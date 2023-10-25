const express = require('express');
const router = express.Router();
const colorController = require('../controller/colorController');

// Định nghĩa các routes cho colorController
router.post('/create', colorController.createColor);
router.get('/getAll', colorController.getAllColors);
router.delete('/delete/:id', colorController.deleteColorById);
router.get('/getProductsWithColor/:id', colorController.getProductsByColor);
router.get('/getById/:id', colorController.getColorById);
router.get('/getByName/:name', colorController.getColorByName);
router.put('/update/:id', colorController.updateColor);

module.exports = router;
