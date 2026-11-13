
import { Router } from "express";
import {
  register,
  login,
  logout,
  me,
  updateProfile,
} from "./auth.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, me);
router.patch("/profile", authenticate, updateProfile);

export default router;
