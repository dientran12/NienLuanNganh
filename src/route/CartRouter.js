import * as CartItemControllers from '../controller/CartItemControllers.js';
import * as CartControllers from '../controller/CartControllers.js';
import express from 'express'

const router = express.Router();

router.post('/addtocart', CartItemControllers.addtocart)
router.post('/updatecart/:id', CartItemControllers.updatecart)
router.delete('/deletecart/:id', CartItemControllers.deletecart)
router.get('/getbyId/:id', CartItemControllers.getCartItem)
router.get('/getCart/:id', CartControllers.getCart)

module.exports = router