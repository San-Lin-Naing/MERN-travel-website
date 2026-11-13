
import { Router } from "express";
import * as controller from "./booking.controller.js";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize("user"),
  controller.createBooking
);

router.get(
  "/my",
  authorize("user"),
  controller.myBookings
);

router.get(
  "/",
  authorize("admin"),
  controller.allBookings
);

router.patch(
  "/:id/status",
  authorize("admin"),
  controller.changeBookingStatus
);

router.patch("/:id/cancel", authenticate, controller.cancelBooking);

export default router;
