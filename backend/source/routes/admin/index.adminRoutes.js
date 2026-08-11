import { Router } from "express";
import adminRouter from "./admin.routes.js";

const router = Router();

router.use("/", adminRouter);

export default router;
