import { Router } from "express";
import blogRouter from "./blog.routes.js";

const router = Router();

router.use("/blogs", blogRouter);

export default router;