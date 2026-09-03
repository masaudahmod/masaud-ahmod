import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import roleGuard from "../../middlewares/roleGuard.js";
import rateLimiter from "../../middlewares/rateLimiter.js";
import * as ContactController from "../../modules/contact/contact.controller.js";

const router = Router();

// Authentication and Authorization Guard
router.use(authenticate);
router.use(roleGuard("SUPER_ADMIN", "ADMIN", "EDITOR"));

// Routes
router.get("/messages", ContactController.getContactMessages);
router.get("/messages/:id", ContactController.getContactMessageById);
router.put("/messages/:id/status", ContactController.updateContactStatus);
router.delete("/messages/:id", ContactController.deleteContactMessage);

export default router;