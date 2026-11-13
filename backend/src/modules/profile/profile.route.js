
import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "./profile.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

// Both endpoints require login
router.get("/me", authenticate, getProfile);
router.patch("/me", authenticate, updateProfile);

export default router;
