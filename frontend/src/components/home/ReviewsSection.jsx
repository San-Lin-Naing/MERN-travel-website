import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import {
  getReviews,
  createReview,
} from "../../api/services/review";

export default function ReviewsSection() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  // Load reviews from backend
  const loadReviews = async () => {
    try {
      setError("");

      const response = await getReviews();

      setReviews(response.data || []);

      setStats(
        response.stats || {
          averageRating: 0,
          totalReviews: 0,
        }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // Show only 3 cards
  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + 4
  );

  const maxIndex = Math.max(0, reviews.length - 3);

  // Next review
  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, maxIndex)
    );
  };

  // Previous review
  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  // Open review modal
  const handleWriteReview = () => {
    if (authLoading) return;

    if (!user) {
      navigate("/login", {
        state: {
          from: "/",
        },
      });

      return;
    }

    setSuccess("");
    setError("");
    setShowModal(true);
  };

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await createReview({
        rating,
        comment: comment.trim(),
      });

      setComment("");
      setRating(0);
      setShowModal(false);
      setCurrentIndex(0);

      setSuccess("Thank you! Your review has been submitted.");

      await loadReviews();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to submit review"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center ">
          <p className="text-sm inline-block font-bold uppercase tracking-wider text-white  bg-blue-600 p-2">
            Customer Reviews
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            What Our Travelers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Read experiences from travelers who have
            explored their journeys with TravelMate.
          </p>
        </div>

        {/* Success */}
        {success && (
          <p
            role="status"
            className="mx-auto mt-6 max-w-2xl rounded-lg bg-green-50 p-3 text-center text-green-700"
          >
            {success}
          </p>
        )}

        {/* Error */}
        {error && !showModal && (
          <p
            role="alert"
            className="mx-auto mt-6 max-w-2xl rounded-lg bg-red-50 p-3 text-center text-red-700"
          >
            {error}
          </p>
        )}

        {/* Reviews */}
        {loading ? (
          <p className="py-12 text-center text-slate-500">
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-slate-500">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        ) : (
          <>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              
                {visibleReviews.map((review) => (
                  <article
                    key={review._id}
                    className="flex h-full flex-col justify-center rounded-3xl border border-slate-200 bg-blue-50 px-4 py-10 shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
                  >

                    {/* user and Stars */}
                    <div className="flex flex-col justify-center text-center items-center">
                      <h3 className="font-bold mb-3 text-slate-900">
                        {review.user?.name || "TravelMate Traveler"}
                      </h3>

                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((number) => (
                          <Star
                            key={number}
                            size={18}
                            className={
                              number <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="mt-5 flex-1 leading-7 text-slate-600">
                      "{review.comment}"
                    </p>

                    {/* date and rating */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </p>

                      <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                        {review.rating}/5
                      </div>
                    </div>
                  </article>
                ))}
              </div>


            {/* Previous / Next */}
            {reviews.length > 3 && (
              <div className="mt-8 flex justify-center gap-6">

                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  aria-label="Previous reviews"
                  className="flex h-13 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-blue-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next reviews"
                  className="flex h-13 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-blue-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={32} />
                </button>

              </div>
            )}
          </>
        )}

        {/* Rating Summary */}
        <div className="mt-6 border-t border-slate-200 pt-8 text-center">

          <div className="flex items-center justify-center gap-2">
            <Star
              size={25}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-3xl font-extrabold text-slate-900">
              {stats.averageRating.toFixed(1)}
            </span>

            <span className="text-slate-500">/ 5</span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Based on {stats.totalReviews} customer reviews
          </p>

          <button
            type="button"
            onClick={handleWriteReview}
            disabled={authLoading}
            className="mt-6 rounded-xl bg-blue-600 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">

          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Write Your Review
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Share your TravelMate experience.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={saving}
                aria-label="Close review form"
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Your Rating
                </label>

                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => setRating(number)}
                      aria-label={`Rate ${number} stars`}
                    >
                      <Star
                        size={32}
                        className={
                          number <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {rating > 0
                    ? `${rating} out of 5 stars`
                    : "Select your rating"}
                </p>
              </div>

              {/* Comment */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Review
                </label>

                <textarea
                  rows={5}
                  maxLength={1000}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your travel experience..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {comment.length}/1000
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving || rating === 0 || !comment.trim()}
                  className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Submitting..." : "Submit Review"}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}