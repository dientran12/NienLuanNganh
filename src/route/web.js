import express from 'express';
let router = express.Router();
import UserRouter from './UserRouter.js';
import order from './OrderRouter.js';


let initWebRouter = (app) => {
    router.use('/api/user', UserRouter);
    // router.use('/api/product', ProductRouter);
    router.use('api/order',order)

    return app.use('/', router);
}

export default initWebRouter;
