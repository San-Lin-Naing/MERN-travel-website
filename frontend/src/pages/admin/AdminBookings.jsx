
import { useCallback, useEffect, useState } from "react";
import {
    getAllBookings,
    updateBookingStatus,
} from "../../api/services/booking.js";

function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [filter, setFilter] = useState("all");

    const loadBookings = useCallback(async () => {
        try {
            setError("");

            const data = await getAllBookings();
            setBookings(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load bookings. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBookings();
    }, [loadBookings]);

    const handleStatusChange = async (bookingId, status) => {
        const action = status === "confirmed" ? "confirm" : "reject";

        const confirmed = window.confirm(
            `Are you sure you want to ${action} this booking?`
        );

        if (!confirmed) return;

        try {
            setUpdatingId(bookingId);
            setError("");
            setMessage("");

            await updateBookingStatus(bookingId, status);

            setMessage(`Booking ${action}ed successfully.`);
            await loadBookings();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                `Failed to ${action} booking.`
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredBookings =
        filter === "all"
            ? bookings
            : bookings.filter((booking) => booking.status === filter);

    const statusStyle = {
        pending: "bg-amber-50 text-amber-700",
        confirmed: "bg-green-50 text-green-700",
        rejected: "bg-red-50 text-red-700",
    };

    const countStatus = (status) =>
        bookings.filter((booking) => booking.status === status).length;

    return (
        <section className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                        Admin Panel
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
                        Manage Bookings
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Review customer bookings and manage their status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={loadBookings}
                    disabled={loading}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
                >
                    Refresh
                </button>
            </div>

            {error && (
                <p
                    role="alert"
                    className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700"
                >
                    {error}
                </p>
            )}

            {message && (
                <p
                    role="status"
                    className="mt-5 rounded-lg bg-green-50 p-4 text-sm text-green-700"
                >
                    {message}
                </p>
            )}

            {/* Booking summary */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Total Bookings", value: bookings.length },
                    { label: "Pending", value: countStatus("pending") },
                    { label: "Confirmed", value: countStatus("confirmed") },
                    { label: "Rejected", value: countStatus("rejected") },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm text-slate-500">{item.label}</p>
                        <p className="mt-3 text-3xl font-extrabold text-slate-900">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-900">
                    Customer Bookings
                </h2>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                    <option value="all">All Bookings</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Booking table */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {loading ? (
                    <p className="p-8 text-sm text-slate-500">
                        Loading bookings...
                    </p>
                ) : filteredBookings.length === 0 ? (
                    <div className="p-10 text-center">
                        <h3 className="font-bold text-slate-800">
                            No bookings found
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Bookings matching this filter will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4">Customer</th>
                                    <th className="px-5 py-4">Travel Package</th>
                                    <th className="px-5 py-4">Travel Date</th>
                                    <th className="px-5 py-4">Guests</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.map((booking) => {
                                    const customer =
                                        booking.user?.name ||
                                        booking.name ||
                                        "Unknown customer";

                                    const email =
                                        booking.user?.email ||
                                        booking.email ||
                                        "No email";

                                    const packageTitle =
                                        booking.post?.title ||
                                        booking.package?.title ||
                                        booking.destination ||
                                        "Travel package";

                                    const dateValue =
                                        booking.travelDate || booking.bookingDate;

                                    const travelDate = dateValue
                                        ? new Date(dateValue).toLocaleDateString()
                                        : "Not specified";

                                    const status = booking.status || "pending";
                                    const isPending = status === "pending";

                                    return (
                                        <tr key={booking._id} className="hover:bg-slate-50">
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-slate-900">
                                                    {customer}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {email}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 font-medium text-slate-700">
                                                {packageTitle}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {travelDate}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {booking.guests ?? booking.numberOfPeople ?? 1}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[status] ||
                                                        "bg-slate-100 text-slate-600"
                                                        }`}
                                                >
                                                    {status}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                {isPending ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            disabled={updatingId === booking._id}
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    booking._id,
                                                                    "confirmed"
                                                                )
                                                            }
                                                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50"
                                                        >
                                                            Confirm
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={updatingId === booking._id}
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    booking._id,
                                                                    "rejected"
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400">
                                                        No action needed
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
            </div>
        </section>
    );
}
export default AdminBookings