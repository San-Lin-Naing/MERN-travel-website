import * as service from "./review.service.js";

export const listReviews = async (req, res, next) => {
  try {
    const result = await service.getAllReviews();

    res.status(200).json({
      data: result.reviews,
      stats: result.stats,
    });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment?.trim()) {
      return res.status(400).json({
        message: "Rating and comment are required",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    if (comment.trim().length > 1000) {
      return res.status(400).json({
        message: "Review must not exceed 1000 characters",
      });
    }

    const review = await service.createReview(
      { rating: numericRating, comment },
      req.user.id
    );

    res.status(201).json({
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};