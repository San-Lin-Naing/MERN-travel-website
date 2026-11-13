import { useCallback, useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
} from "../api/services/booking";

const statusStyle = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  cancelled: "bg-slate-100 text-slate-600",
};

// ဈေးနှုန်းကို စစ်ပြီး MMK format ပြောင်းပေးမယ်
const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Price unavailable";
  }

  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "Price unavailable";
  }

  return `${price.toLocaleString()} MMK`;
};

// Booking တစ်ခုချင်းစီရဲ့ Price ကိုတွက်ပေးမယ်
const getBookingPrices = (booking) => {
  // Booking ထဲက price ကို အရင်ယူမယ်။
  // မရှိမှ populated post ထဲက price ကို ယူမယ်။
  const rawPrice =
    booking.pricePerPerson ?? booking.post?.price;

  const pricePerPerson =
    rawPrice === null || rawPrice === undefined || rawPrice === ""
      ? null
      : Number(rawPrice);

  const validPrice =
    pricePerPerson !== null &&
    Number.isFinite(pricePerPerson);

  // Backend က totalPrice ပါလာရင် အဲဒါကိုပဲ သုံးမယ်။
  // မပါခဲ့ရင် pricePerPerson × travelers နဲ့တွက်မယ်။
  const rawTotal = booking.totalPrice;
  const travelers = Number(booking.travelers);

  let totalPrice = null;

  if (
    rawTotal !== null &&
    rawTotal !== undefined &&
    rawTotal !== "" &&
    Number.isFinite(Number(rawTotal))
  ) {
    totalPrice = Number(rawTotal);
  } else if (
    validPrice &&
    Number.isInteger(travelers) &&
    travelers > 0
  ) {
    totalPrice = pricePerPerson * travelers;
  }

  return {
    pricePerPerson: validPrice ? pricePerPerson : null,
    totalPrice,
  };
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // User ရဲ့ Booking တွေကို Backend ကနေယူမယ်
  const loadBookings = useCallback(async () => {
    try {
      setError("");

      const data = await getMyBookings();

      // API က Array ပြန်လာတာကို စစ်မယ်
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load bookings"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Booking Cancel 
  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(bookingId);
      setError("");

      await cancelBooking(bookingId);

      await loadBookings();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to cancel booking"
      );
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900">
        My Bookings
      </h1>

      <p className="mt-2 text-slate-500">
        Review your trip requests and booking status.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg bg-red-50 p-3 text-red-700"
        >
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-10 text-slate-500">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed p-10 text-center">
          <h2 className="text-lg font-bold">
            No bookings yet
          </h2>

          <p className="mt-2 text-slate-500">
            Visit Travel Posts to book your first trip.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Package
                </th>

                <th className="px-5 py-4 font-semibold">
                  Travel date
                </th>

                <th className="px-5 py-4 font-semibold">
                  Travelers
                </th>

                <th className="px-5 py-4 font-semibold">
                  Price / Person
                </th>

                <th className="px-5 py-4 font-semibold">
                  Total Price
                </th>

                <th className="px-5 py-4 font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => {
                const {
                  pricePerPerson,
                  totalPrice,
                } = getBookingPrices(booking);

                const travelDate = booking.travelDate
                  ? new Date(booking.travelDate)
                  : null;

                const validTravelDate =
                  travelDate &&
                  !Number.isNaN(travelDate.getTime());

                return (
                  <tr key={booking._id}>
                    {/* Package */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {booking.post?.title ||
                          "Package unavailable"}
                      </p>

                      <p className="mt-1 text-slate-500">
                        {booking.post?.destination || ""}
                      </p>
                    </td>

                    {/* Travel date */}
                    <td className="px-5 py-4">
                      {validTravelDate
                        ? travelDate.toLocaleDateString()
                        : "Date unavailable"}
                    </td>

                    {/* Travelers */}
                    <td className="px-5 py-4">
                      {booking.travelers ?? "-"}
                    </td>

                    {/* Price per person */}
                    <td className="px-5 py-4">
                      {formatPrice(pricePerPerson)}
                    </td>

                    {/* Total price */}
                    <td className="px-5 py-4 font-semibold">
                      {formatPrice(totalPrice)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          statusStyle[booking.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {booking.status || "Unknown"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      {booking.status === "pending" ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleCancel(booking._id)
                          }
                          disabled={
                            cancellingId === booking._id
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          {cancellingId === booking._id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No action
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
