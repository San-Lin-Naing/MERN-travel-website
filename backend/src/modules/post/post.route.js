import { Router } from "express";
import * as controller from "./post.controller.js";

import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware.js";

import {
  uploadPostImages,
} from "../../middlewares/upload.middleware.js";

import jwt from "jsonwebtoken";
import User from "../auth/auth.model.js";

const router = Router();

// Optional Cookie Authentication
const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Public posts can still be viewed without a valid login
    next();
  }
};

// Public posts / Admin all posts
router.get(
  "/",
  optionalAuthenticate,
  controller.listPosts
);

// Single post details
router.get(
  "/:id",
  optionalAuthenticate,
  controller.getPost
);

// Admin-only create
router.post(
  "/",
  authenticate,
  authorize("admin"),
  uploadPostImages,
  controller.createPost
);

// Admin-only update
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  uploadPostImages,
  controller.updatePost
);

// Admin-only delete
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  controller.removePost
);

export default router;