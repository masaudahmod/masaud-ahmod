import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import * as AuthController from "../../modules/auth/auth.controller.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/login", AuthController.login);
router.post("/verify-login", AuthController.verifyLogin);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.get("/me", authenticate, AuthController.me);
router.post("/logout-all", authenticate, AuthController.logoutAll);

export default router;
