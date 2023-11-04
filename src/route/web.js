import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter.js';
import CartRouter from './CartRouter.js'
import ProductRouter from './ProductRouter.js';
import colorRouter from './ColorRouter.js';
import sizeRouter from './SizeRouter.js';
import detailRouter from './VersionRouter.js';
import categoryRouter from './CategoriesRouter.js';
import PromotionRouter from './PromotionRouter.js';
import ReviewRouter from './ReviewRouter.js';
<<<<<<< HEAD
import OrderRouter from './OrderRouter.js';
=======
import SizeItemRouter from './SizeItemRouter.js';
>>>>>>> e1eb7e91463d75a554a1686dcaee41ac68f49a23

let initWebRouter = (app) => {
    // API của User
    router.use('/api/user', UserRouter);
<<<<<<< HEAD

    // router.use('/api/product', ProductRouter);
    router.use('/api/cart',CartRouter)
    router.use('/api/user', UserRouter);
    router.use('/apiproduct', ProductRouter);

=======
    // API của Product
>>>>>>> e1eb7e91463d75a554a1686dcaee41ac68f49a23
    router.use('/api/product', ProductRouter);
    // API của Color
    router.use('/api/color', colorRouter);
    // API của Size
    router.use('/api/size', sizeRouter);
    // API của ProductDetail (chi tiết sản phẩm)
    router.use('/api/version', detailRouter);
    // API của Category (danh mục)
    router.use('/api/category', categoryRouter);
    // API của Promotion (khuyến mãi)
    router.use('/api/promotion', PromotionRouter);
    // API của Review (đánh giá)
    router.use('/api/review', ReviewRouter);
    // API của SizeItem
    router.use('/api/sizeitem', SizeItemRouter)

    router.use('/api/order', OrderRouter);

    return app.use('/', router);
}

export default initWebRouter;
