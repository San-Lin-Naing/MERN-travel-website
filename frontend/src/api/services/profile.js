import api from "../axios";

// Get the logged-in user's profile
export const getMyProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data.data;
};

// Update the logged-in user's profile
export const updateMyProfile = async (data) => {
  const response = await api.patch("/profile/me", data);
  return response.data.data;
};
