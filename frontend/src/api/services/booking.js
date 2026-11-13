import api from "../axios";

// User က Booking အသစ်တင်ရန်
export const createBooking = async (data) => {
  const response = await api.post("/bookings", data);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.patch(`/bookings/${id}/cancel`);
  return response.data;
};

// User က ကိုယ်တင်ထားတဲ့ Bookings တွေ ကြည့်ရန်
export const getMyBookings = async () => {
  const response = await api.get("/bookings/my");
  return response.data.data;
};

// Admin က Booking အားလုံး ကြည့်ရန်
export const getAllBookings = async () => {
  const response = await api.get("/bookings");
  return response.data.data;
};

// Admin က Booking ကို Confirm / Reject လုပ်ရန်
export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(
    `/bookings/${id}/status`,
    { status }
  );

  return response.data;
};

