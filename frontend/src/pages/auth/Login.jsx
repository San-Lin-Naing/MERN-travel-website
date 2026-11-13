
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    // Toast ကို 3 seconds နောက်မှာ ဖျောက်မယ်
    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await signIn(form);

      // Success Toast
      showToast("success", "Login successful! Welcome back.");

      const destination =
        location.state?.from ||
        (user.role === "admin" ? "/admin" : "/");

      // Toast ပြပြီးမှ Navigate လုပ်မယ်
      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 1000);

    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to login";

      setError(message);

      // Error Toast
      showToast("error", message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div
          role="alert"
          className={`fixed right-5 top-5 z-[100] flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold text-white shadow-xl animate-in slide-in-from-right duration-300 ${
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

      <h1 className="text-2xl font-bold text-slate-900">
        Welcome back
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Sign in to continue your journey.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-700"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
