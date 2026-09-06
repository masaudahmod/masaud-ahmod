// backend/source/routes/admin/category.routes.js
import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import roleGuard from "../../middlewares/roleGuard.js";
import * as CategoryController from "../../modules/category/category.controller.js";

const router = Router();

router.use(authenticate);
router.use(roleGuard("SUPER_ADMIN", "ADMIN", "EDITOR"));

router.get("/", CategoryController.getCategories);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;

