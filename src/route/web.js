import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter';
import ProductRouter from './ProductRouter';

let initWebRouter = (app) => {
    router.use('/api/user', UserRouter);
    // router.use('/api/product', ProductRouter);

    return app.use('/', router);
}

export default initWebRouter;
