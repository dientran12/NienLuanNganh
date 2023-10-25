import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter.js';

import order from './OrderRouter.js';

import CartRouter from './CartRouter.js'
import ProductRouter from './ProductRouter.js';

let initWebRouter = (app) => {
    router.use('/api/user', UserRouter);
    router.use('/api/order',order);
    router.use('/api/cart',CartRouter);
    router.use('/api/user', UserRouter);
    router.use('/apiproduct', ProductRouter);

    return app.use('/', router);
}

export default initWebRouter;
