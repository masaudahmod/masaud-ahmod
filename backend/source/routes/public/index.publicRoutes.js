import { Router } from "express";
import blogRouter from "./blog.routes.js";
import contactRouter from "./contact.routes.js";

const router = Router();

router.use("/blogs", blogRouter);
router.use("/contact", contactRouter);

export default router;