import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter.js';
import CartRouter from './CartRouter.js'

let initWebRouter = (app) => {
    router.use('/api/user', UserRouter);
    // router.use('/api/product', ProductRouter);
    router.use('/api/cart',CartRouter)

    return app.use('/', router);
}

export default initWebRouter;
