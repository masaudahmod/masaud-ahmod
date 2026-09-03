import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import * as AuthController from "../../modules/auth/auth.controller.js";
import rateLimiter from "../../middlewares/rateLimiter.js";

const router = Router();

router.post("/register", rateLimiter({ limit: 5, windowSec: 60 }), AuthController.register);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/login", rateLimiter({ limit: 8, windowSec: 60 }), AuthController.login);
router.post("/verify-login", AuthController.verifyLogin);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.get("/me", authenticate, AuthController.me);
router.post("/logout-all", authenticate, AuthController.logoutAll);

export default router;
