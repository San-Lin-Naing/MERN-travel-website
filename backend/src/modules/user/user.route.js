import { Router } from "express";
import { listUsers } from "./user.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, authorize("admin"), listUsers);

export default router;