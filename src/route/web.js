import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter.js';
import ProductRouter from './ProductRouter.js';
import colorRouter from './ColorRouter.js';
import sizeRouter from './SizeRouter.js';
import detailRouter from './ProductDetailRouter.js';
import categoryRouter from './CategoriesRouter.js';
import PromotionRouter from './PromotionRouter.js';
import ReviewRouter from './ReviewRouter.js';

let initWebRouter = (app) => {
    router.use('/api/user', UserRouter);
    router.use('/apiproduct', ProductRouter);
    router.use('/colors', colorRouter);
    router.use('/sizes', sizeRouter);
    router.use('/details', detailRouter);
    router.use('/categories', categoryRouter);
    router.use('/promotions', PromotionRouter);
    router.use('/reviews', ReviewRouter);

    return app.use('/', router);
}

export default initWebRouter;
