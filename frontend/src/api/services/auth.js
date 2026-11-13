import api from "../axios";

// Register
export const register = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

// Logout
export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// Get current user
export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data.data;
};

// Update profile
export const updateProfile = async (data) => {
  const response = await api.patch("/auth/profile", data);

  return response.data;
};