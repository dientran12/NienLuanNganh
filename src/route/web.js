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
    router.use('/api/product', ProductRouter);
    router.use('/api/color', colorRouter);
    router.use('/api/size', sizeRouter);
    router.use('/api/detail', detailRouter);
    router.use('/api/category', categoryRouter);
    router.use('/api/promotion', PromotionRouter);
    router.use('/api/review', ReviewRouter);

    return app.use('/', router);
}

export default initWebRouter;
