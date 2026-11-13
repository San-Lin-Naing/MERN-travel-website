import { useState } from "react";
import { createBooking } from "../../api/services/booking";

export default function BookingModal({ post, onClose, onSuccess }) {
  const [booking, setBooking] = useState({
    travelers: 5,
    travelDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Admin သတ်မှတ်ထားတဲ့ လူတစ်ယောက်စာဈေး
  const pricePerPerson = Number(post?.price || 0);

  // Travelers အရေအတွက်အလိုက် စုစုပေါင်းတွက်ချက်ခြင်း
  const totalPrice = pricePerPerson * Number(booking.travelers);

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const travelers = Number(booking.travelers);

    if (!Number.isInteger(travelers) || travelers < 5 || travelers > 50) {
      setError("Number of travelers must be between 5 and 50.");
      return;
    }

    if (!booking.travelDate) {
      setError("Please select a travel date.");
      return;
    }

    try {
      setLoading(true);

      await createBooking({
        post: post._id,
        travelers,
        travelDate: booking.travelDate,
      });

      onSuccess?.(
        "Booking submitted successfully. Waiting for admin approval."
      );

      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to book this trip"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Book: {post.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-2xl text-slate-400 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Your booking will remain pending until the admin reviews it.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Travel Date */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Travel Date
            </label>

            <input
              type="date"
              required
              min={minDate}
              value={booking.travelDate}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  travelDate: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
            />
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Travellers အနည်းဆုံး ၅ ယောက်က စသည်။
            </label>

            <input
              type="number"
              min="5"
              max="50"
              step="1"
              required
              value={booking.travelers}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  travelers: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
            />
          </div>

          {/* Price Calculation */}
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Price per person</span>
              <span>{pricePerPerson.toLocaleString()} MMK</span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-slate-600">
              <span>Number of travelers</span>
              <span>{booking.travelers || 0}</span>
            </div>

            <div className="my-3 border-t border-slate-200" />

            <div className="flex justify-between">
              <span className="font-bold text-slate-900">
                Total Price
              </span>
              <span className="text-xl font-extrabold text-blue-600">
                {totalPrice.toLocaleString()} MMK
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={
                loading ||
                Number(booking.travelers) < 5 ||
                Number(booking.travelers) > 50 ||
                !Number.isInteger(Number(booking.travelers))
              }
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}