import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.route.js";
import postRoutes from "./modules/post/post.route.js";
import bookingRoutes from "./modules/booking/booking.route.js";
import profileRoutes from "./modules/profile/profile.route.js";
import reviewRoutes from "./modules/review/review.route.js";
import userRoutes from "./modules/user/user.route.js";

import {
  notFound,
  errorHandler,
} from "./middlewares/error.middleware.js";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ message: "Travel API is running" });
});


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
