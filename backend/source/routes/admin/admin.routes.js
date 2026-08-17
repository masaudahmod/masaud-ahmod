import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import roleGuard from "../../middlewares/roleGuard.js";
import * as AdminController from "../../modules/admin/admin.controller.js";
import rateLimiter from "../../middlewares/rateLimiter.js";

const router = Router();

router.use(authenticate);

// List admins (only super admin)
router.get("/admins", roleGuard("SUPER_ADMIN"), AdminController.listAdmins);

// Create admin (only super admin)
router.post("/admins", roleGuard("SUPER_ADMIN"), rateLimiter({ limit: 5, windowSec: 60 }), AdminController.createAdmin);

// Get single admin (only super admin)
router.get("/admins/:id", roleGuard("SUPER_ADMIN"), AdminController.getAdmin);

// Update admin (only super admin)
router.put("/admins/:id", roleGuard("SUPER_ADMIN"), AdminController.updateAdmin);

// Delete admin (soft-delete) (only super admin)
router.delete("/admins/:id", roleGuard("SUPER_ADMIN"), AdminController.deleteAdmin);

export default router;
