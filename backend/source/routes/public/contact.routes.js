import { Router } from "express";
import { createContactMessage } from "../../modules/public/contact.controller.js";

const router = Router();

router.post("/create", createContactMessage);

export default router;
