import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter.js';
import CartRouter from './CartRouter.js'
import ProductRouter from './ProductRouter.js';
import colorRouter from './ColorRouter.js';
import sizeRouter from './SizeRouter.js';
import detailRouter from './ProductDetailRouter.js';
import categoryRouter from './CategoriesRouter.js';
import PromotionRouter from './PromotionRouter.js';
import ReviewRouter from './ReviewRouter.js';

let initWebRouter = (app) => {
    router.use('/api/user', UserRouter);
<<<<<<< HEAD
    // router.use('/api/product', ProductRouter);
    router.use('/api/cart',CartRouter)
    router.use('/api/user', UserRouter);
    router.use('/apiproduct', ProductRouter);
=======
    router.use('/api/product', ProductRouter);
    router.use('/api/color', colorRouter);
    router.use('/api/size', sizeRouter);
    router.use('/api/detail', detailRouter);
    router.use('/api/category', categoryRouter);
    router.use('/api/promotion', PromotionRouter);
    router.use('/api/review', ReviewRouter);
>>>>>>> c098a8cdac5cdf98c0aebe094ae28fd3b9055823

    return app.use('/', router);
}

export default initWebRouter;
