import { NavLink } from "react-router-dom";

const menuItems = [
  {
    to: "/admin",
    label: "Dashboard",
    end: true,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    to: "/admin/posts",
    label: "Manage Posts",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    to: "/admin/bookings",
    label: "Manage Bookings",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    to: "/admin/users",
    label: "User List",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-slate-200/80 bg-white p-6 md:min-h-screen md:w-72 md:border-b-0 md:border-r md:shadow-sm">
      {/* Brand / Title section */}
      <div className="mb-6 hidden md:block px-3">
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          UPK Jinghpaw Admin
        </p>
        <h2 className="mt-1 text-lg font-extrabold text-slate-900">
          Control Panel
        </h2>
      </div>

      <div className="md:hidden mb-4">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 px-3">
          Admin Menu
        </h2>
      </div>

      <nav className="flex flex-wrap gap-1.5 md:flex-col md:space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-full px-4 py-3 text-sm font-bold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-green-400 to-amber-400 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}