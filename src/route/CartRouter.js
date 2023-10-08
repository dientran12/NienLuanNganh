import * as CartItemControllers from '../controller/CartItemControllers.js';
import * as CartControllers from '../controller/CartControllers.js';
import express from 'express'

const router = express.Router();

// router.post('/addtocart/:id', CartItemControllers.addtocart)
router.post('/addtocart/:userId/:productId', CartItemControllers.addtocartitem)
router.post('/updatecart/:id', CartItemControllers.updatecart)
router.delete('/deletecart/:id', CartItemControllers.deletecart)
router.get('/getcartitem/:id', CartItemControllers.getCartItem)
router.get('/getCart/:id', CartControllers.getCart)

module.exports = router