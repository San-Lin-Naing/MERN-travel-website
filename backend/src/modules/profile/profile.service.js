
import User from "../auth/auth.model.js";

// Get the currently logged-in user's profile
export const getMyProfile = async (userId) => {
  const user = await User.findById(userId).select(
    "-password -__v"
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

// Update the currently logged-in user's profile
export const updateMyProfile = async (userId, data) => {
  const allowedFields = ["name", "phone", "address", "avatar"];
  const updates = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updates[field] =
        typeof data[field] === "string"
          ? data[field].trim()
          : data[field];
    }
  }

  if (updates.name !== undefined && !updates.name) {
    const error = new Error("Name is required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -__v");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};
