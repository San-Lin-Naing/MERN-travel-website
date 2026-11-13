
import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <Link
          to="/admin"
          className="text-xl font-extrabold text-blue-600"
        >
          UPK Jinghpaw
          <span className="ml-2 text-xs font-semibold text-slate-400">
            ADMIN
          </span>
        </Link>


        <Link
          to="/"
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-300"
        >
          View Website
        </Link>


      </header>

      {/* Sidebar + Page Content */}
      <div className="mx-auto flex max-w-[1600px] flex-col md:min-h-[calc(100vh-65px)] md:flex-row">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
