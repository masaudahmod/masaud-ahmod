import { Router } from "express";
import adminRouter from "./admin.routes.js";
import blogRouter from "./blog.routes.js";
import contactRouter from "./contact.routes.js";
import categoryRouter from "./category.routes.js";

const router = Router();

router.use("/", adminRouter);
router.use("/blog", blogRouter);
router.use("/contact", contactRouter);
router.use("/categories", categoryRouter);

export default router;
