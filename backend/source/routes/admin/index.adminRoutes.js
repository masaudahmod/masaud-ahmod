import { Router } from "express";
import adminRouter from "./admin.routes.js";
import blogRouter from "./blog.routes.js";

const router = Router();

router.use("/", adminRouter);
router.use("/blog", blogRouter);

export default router;
