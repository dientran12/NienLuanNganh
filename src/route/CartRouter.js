import * as CartItemControllers from '../controller/CartItemControllers.js';
import * as CartControllers from '../controller/CartControllers.js';
import express from 'express'

const router = express.Router();

// router.post('/addtocart/:id', CartItemControllers.addtocart)
router.post('/addtocart/:userId/:productId', CartItemControllers.addtocartitem)
router.post('/updatecart/:userId/:productId', CartItemControllers.updatecart)
router.delete('/deletecart/:userId/:productId', CartItemControllers.deletecart)
router.get('/getcartitem/:id', CartItemControllers.getCartItem)
router.get('/getCart/:id', CartControllers.getCart)
router.get('/getalldata/:userId', CartItemControllers.getAllCartItemController)

module.exports = router