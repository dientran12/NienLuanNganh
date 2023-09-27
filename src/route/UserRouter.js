import express from 'express';
import authMiddleware from '../middleware/authUserMiddleware';
import UserController from '../controller/UserController';

const router = express.Router({ mergeParams: true });

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.post('/log-out', UserController.logoutnUser)
router.put('/update/:id', authMiddleware.memberAuth, UserController.updateUser)
router.delete('/delete/:id', authMiddleware.adminAuth, UserController.deleteUser)
router.get('/get-all', authMiddleware.adminAuth, UserController.getAllUsers)
router.get('/get-details/:id', authMiddleware.memberAuth, UserController.getDetailsUser)
router.post('/refresh-token', UserController.refreshToken)

export default router
