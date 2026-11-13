
import Booking from "./booking.model.js";
import Post from "../post/post.model.js";

export const createBooking = async (data, userId) => {
  const selectedPost = await Post.findOne({
    _id: data.post,
    published: true,
  });

  if (!selectedPost) {
    throw new Error("Travel package not found");
  }

  const travelDate = new Date(data.travelDate);

  if (
    Number.isNaN(travelDate.getTime()) ||
    travelDate <= new Date()
  ) {
    throw new Error("Travel date must be in the future");
  }

  const numberOfTravelers = Number(data.travelers);

  if (
    !Number.isInteger(numberOfTravelers) ||
    numberOfTravelers < 1 ||
    numberOfTravelers > 50
  ) {
    throw new Error("Travelers must be between 1 and 50.");
  }

  // Price ကို backend က Post ထဲကနေယူပြီး တွက်ချက်မယ်
  const pricePerPerson = Number(selectedPost.price);
  const totalPrice = pricePerPerson * numberOfTravelers;

  return Booking.create({
    user: userId,
    post: selectedPost._id,
    travelers: numberOfTravelers,
    travelDate,
    pricePerPerson,
    totalPrice,
    status: "pending",
  });
};

// Cancel only pending booking
export const cancelMyBooking = async (bookingId, userId) => {
  const booking = await Booking.findOneAndUpdate(
    {
      _id: bookingId,
      user: userId,
      status: "pending",
    },
    {
      $set: { status: "cancelled" },
    },
    {
      new: true,
    }
  );

  if (!booking) {
    throw new Error("Booking not found or cannot be cancelled.");
  }

  return booking;
};

export const getMyBookings = (userId) =>
  Booking.find({ user: userId })
    .populate("post", "title destination price duration")
    .sort({ createdAt: -1 });

export const getAllBookings = () =>
  Booking.find()
    .populate("user", "name email")
    .populate("post", "title destination price duration")
    .sort({ createdAt: -1 });

export const updateBookingStatus = async (id, status) => {
  if (!["confirmed", "rejected"].includes(status)) {
    throw new Error("Invalid booking status");
  }

  const booking = await Booking.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true }
  );

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};
