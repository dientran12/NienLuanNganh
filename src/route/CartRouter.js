import * as CartControllers from '../controller/CartControllers.js';
import express from 'express'

const router = express.Router();

router.post('/addtocart', CartControllers.addtocart)
router.post('/updatecart/:id', CartControllers.updatecart)
router.delete('/deletecart/:id', CartControllers.deletecart)

module.exports = router