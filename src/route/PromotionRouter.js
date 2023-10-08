import * as PromotionControllers from '../controller/PromotionControllers.js';
import express from 'express'

const router = express.Router();

router.post('/addPromotion', PromotionControllers.addPromotion)
router.post('/updatePromotion/:id', PromotionControllers.updatePromotion)
router.delete('/deletePromotion/:id', PromotionControllers.deletePromotion)
router.get('/getPromotion/:id', PromotionControllers.getPromotion)

module.exports = router