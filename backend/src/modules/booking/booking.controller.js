import * as service from "./booking.service.js";

export const createBooking = async (req, res, next) => {
  try {
    const { post, travelers, travelDate } = req.body;
    const count = Number(travelers);

    if (!post || !travelDate || !Number.isInteger(count) || count < 1 || count > 50) {
      return res.status(400).json({
        message: "Valid package, travel date and traveler count are required",
      });
    }

    const booking = await service.createBooking(
      { ...req.body, travelers: count },
      req.user.id
    );

    res.status(201).json({
      message: "Booking submitted",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};



export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await service.cancelMyBooking(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const myBookings = async (req, res, next) => {
  try {
    const bookings = await service.getMyBookings(req.user.id);

    res.json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

export const allBookings = async (req, res, next) => {
  try {
    const bookings = await service.getAllBookings();

    res.json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

export const changeBookingStatus = async (req, res, next) => {
  try {
    const booking = await service.updateBookingStatus(
      req.params.id,
      req.body.status
    );

    res.json({
      message: "Booking status updated",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
