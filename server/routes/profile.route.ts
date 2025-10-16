import { Router } from "express";
import { ProfileController } from "server/controllers/profile.controller";
import { protect } from "server/middlewares/auth.middleware";
const router = Router();

router.use(protect);

router.get('/me', ProfileController.getMyProfile);
router.put('/me', ProfileController.updateMyProfile);


export default router;