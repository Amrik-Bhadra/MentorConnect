import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { protect } from "server/middlewares/auth.middleware";
const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.get('/refresh', AuthController.refreshToken);
router.get('/me', protect, AuthController.me);

export default router;