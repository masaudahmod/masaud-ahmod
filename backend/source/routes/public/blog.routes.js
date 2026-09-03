import { Router } from "express";
import { getPublicPost, getPublicPosts } from "../../modules/public/blog.controller.js";

const router = Router();

router.get("/", getPublicPosts);
router.get("/:slug", getPublicPost);

export default router;
