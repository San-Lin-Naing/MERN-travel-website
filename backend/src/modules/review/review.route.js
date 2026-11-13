import { Router } from "express";
import * as controller from "./review.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

// Everyone can view reviews
router.get("/", controller.listReviews);

// Only logged-in users can write reviews
router.post("/", authenticate, controller.addReview);

export default router;