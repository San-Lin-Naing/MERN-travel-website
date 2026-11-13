import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllBookings,
  updateBookingStatus,
} from "../../api/services/booking.js";
import { getAllUsers } from "../../api/services/user.js";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadBookings = useCallback(async () => {
    try {
      setError("");

      const [bookingData, userResponse] = await Promise.all([
        getAllBookings(),
        getAllUsers(),
      ]);

      setBookings(bookingData);
      setUsers(
        userResponse.totalUsers ?? userResponse.data?.length ?? 0
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const changeStatus = async (id, status) => {
    setError("");
    setMessage("");

    try {
      await updateBookingStatus(id, status);
      setMessage(`Booking ${status} successfully!`);
      await loadBookings();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update booking");
    }
  };

  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <div>
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
              Administration
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage travel content, monitor metrics, and review customer bookings.
            </p>
          </div>

          <Link
            to="/posts"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-amber-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-amber-600 hover:to-cyan-700"
          >
            <span>Manage Travel Posts</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Analytics Summary Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              label: "Total Bookings", 
              value: bookings.length, 
              bg: "bg-blue-50 text-blue-600",
              border: "border-blue-300" 
            },
            { 
              label: "Pending Review", 
              value: pending, 
              bg: "bg-amber-50 text-amber-600",
              border: "border-amber-400" 
            },
            { 
              label: "Confirmed Bookings", 
              value: confirmed, 
              bg: "bg-emerald-50 text-emerald-600",
              border: "border-emerald-400" 
            },
            { 
              label: "Total Users", 
              value: users, 
              bg: "bg-indigo-50 text-indigo-600",
              border: "border-indigo-400" 
            },
          ].map((item) => (
            <div 
              key={item.label} 
              className={`rounded-2xl border ${item.border} bg-white p-6 shadow-xl transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <span className={`rounded-xl p-2.5 ${item.bg}`}>
                  <div className="h-2 w-2 rounded-full bg-current"></div>
                </span>
              </div>
              <p className="mt-4 text-3xl font-black text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Notifications / Alerts */}
        {error && (
          <div role="alert" className="mt-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200 shadow-sm">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
        {message && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 border border-emerald-200 shadow-sm">
            <span className="font-bold">Success:</span> {message}
          </div>
        )}

        {/* Booking Management Table Section */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900">Booking Management</h2>
            <p className="text-sm text-slate-500 mt-0.5">Review, approve, or reject customer trip requests.</p>
          </div>

          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-slate-500 font-medium">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="m-6 rounded-xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-slate-500 font-medium">No bookings have been submitted yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">Travel Date</th>
                    <th className="px-6 py-4">Travelers</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => {
                    const statusClass = 
                      booking.status === "confirmed" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : booking.status === "rejected"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200";

                    return (
                      <tr key={booking._id} className="transition-colors hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{booking.user?.name || "Unknown"}</p>
                          <p className="text-xs text-slate-500">{booking.user?.email}</p>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {booking.post?.title || "Package unavailable"}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">
                          {new Date(booking.travelDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="font-semibold text-slate-900">{booking.travelers}</span> person(s)
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClass}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {booking.status === "pending" ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => changeStatus(booking._id, "confirmed")}
                                className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => changeStatus(booking._id, "rejected")}
                                className="rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400 italic">Reviewed</span>
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
      </div>
    </section>
  );
}