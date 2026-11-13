
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../src/modules/auth/auth.model.js";

const createAdmin = async () => {
  try {
    if (
      !process.env.MONGODB_URI ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.JWT_SECRET
    ) {
      throw new Error("Required environment variables are missing");
    }

    if (process.env.ADMIN_PASSWORD.length < 12) {
      throw new Error("Admin password must be at least 12 characters");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
    const existing = await User.findOne({ email });

    if (existing) {
      if (existing.role !== "admin") {
        throw new Error(
          "This email already belongs to a non-admin account"
        );
      }

      console.log("Admin account already exists");
      return;
    }

    const password = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    await User.create({
      name: "Travel Admin",
      email,
      password,
      role: "admin",
    });

    console.log("Admin account created");
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
