
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 block text-center text-2xl font-extrabold text-blue-700"
        >
          TravelMate
        </Link>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
