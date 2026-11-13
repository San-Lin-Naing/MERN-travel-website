import Review from "./review.model.js";

export const getAllReviews = async () => {
  const reviews = await Review.find()
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .limit(100);

  const stats = await Review.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return {
    reviews,
    stats: {
      averageRating: stats[0]?.averageRating
        ? Number(stats[0].averageRating.toFixed(1))
        : 0,

      totalReviews: stats[0]?.totalReviews || 0,
    },
  };
};

export const createReview = async (data, userId) => {
  const review = await Review.create({
    user: userId,
    rating: Number(data.rating),
    comment: data.comment.trim(),
  });

  return Review.findById(review._id).populate("user", "name");
};