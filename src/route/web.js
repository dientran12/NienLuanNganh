import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter.js';
import ProductRouter from './ProductRouter.js';

let initWebRouter = (app) => {
    //router.use('/api/user', UserRouter);
    router.use('/api/product', ProductRouter);

    return app.use('/', router);
}

export default initWebRouter;
