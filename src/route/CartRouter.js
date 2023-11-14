import * as CartItemControllers from '../controller/CartItemControllers.js';
import * as CartControllers from '../controller/CartControllers.js';
import express from 'express'

const router = express.Router();

// router.post('/addtocart/:id', CartItemControllers.addtocart)
router.post('/addtocart/:userId/:sizeItemId', CartItemControllers.addtocartitem)
router.post('/updatecart/:userId/:sizeItemId', CartItemControllers.updatecart)
router.delete('/deletecart/:userId/:sizeItemId', CartItemControllers.deletecart)
router.get('/getcartitem/:id', CartItemControllers.getCartItem)
router.get('/getCart/:id', CartControllers.getCart)
router.get('/getalldata/:userId', CartItemControllers.getAllCartItemController)

module.exports = router