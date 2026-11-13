
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-slate-900 font-serif font-medium transition ${
    isActive
      ? "text-blue-700 underline decoration-2"
      : "text-slate-600 underline-offset-4 hover:underline transition-all duration-300"
  }`;

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Toast ပြရန်
  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Confirm Logout
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await signOut();

      setShowLogoutModal(false);

      // Success Toast
      showToast("success", "Logout successful! See you again.");

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Logout failed:", error);

      // Error Toast
      showToast(
        "error",
        error.response?.data?.message || "Unable to logout"
      );

    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div
          role="alert"
          className={`fixed right-5 top-5 z-[200] flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold text-white shadow-xl ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          <span className="text-lg">
            {toast.type === "success" ? "✓" : "✕"}
          </span>

          <span>{toast.message}</span>

          <button
            type="button"
            onClick={() =>
              setToast({
                show: false,
                type: "",
                message: "",
              })
            }
            className="ml-2 text-lg opacity-80 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/95 backdrop-blur shadow-sm"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

          {/* Logo */}
          <a href="/" className="relative flex items-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="absolute left-0 top-1/2 h-15 w-auto max-w-none -translate-y-1/2 object-contain drop-shadow-md"
            />
            <span className="h-10 w-36"></span>
          </a>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-1">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/posts" className={navClass}>
              Destinations
            </NavLink>

            <NavLink to="/about" className={navClass}>
              About Us
            </NavLink>

            {user?.role === "admin" && (
              <NavLink to="/admin" className={navClass}>
                Admin Dashboard
              </NavLink>
            )}

            {user?.role === "user" && (
              <>
                <NavLink to="/profile" className={navClass}>
                  {user.name}
                </NavLink>

                <NavLink to="/my-bookings" className={navClass}>
                  My Bookings
                </NavLink>
              </>
            )}

            {!user ? (
              <>
                <NavLink to="/login" className={navClass}>
                  Login
                </NavLink>

                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-300"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => {
            if (!logoutLoading) setShowLogoutModal(false);
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-7 w-7 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-slate-900">
              Confirm Logout
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Are you sure you want to log out of your account?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={logoutLoading}
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                No, Cancel
              </button>

              <button
                type="button"
                disabled={logoutLoading}
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {logoutLoading ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
