import User from "../auth/auth.model.js";

export const getAllUsers = async () => {
  const users = await User.find()
    .select("name email createdAt")
    .sort({ createdAt: -1 });

  return users;
};