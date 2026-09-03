import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import roleGuard from "../../middlewares/roleGuard.js";
import rateLimiter from "../../middlewares/rateLimiter.js";
import * as BlogController from "../../modules/blog/blog.controller.js";

const router = Router();

router.use(authenticate);
router.use(roleGuard("SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"));

router.get("/posts", BlogController.getPosts);
router.get("/posts/:id", BlogController.getPost);
router.post("/posts", rateLimiter({ limit: 5, windowSec: 60 }), BlogController.createPost);
router.put("/posts/:id", BlogController.updatePost);
router.delete("/posts/:id", BlogController.deletePost);

export default router;
