import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../../api/services/user";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setError("");

      const response = await getAllUsers();

      setUsers(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <section className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-blue-600">
          Administration
        </span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          User Management
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View registered users, monitor accounts, and check their email addresses.
        </p>
      </div>

      {/* Total Users Card - Inline Block / Compact Style */}
      <div className="mb-8 inline-flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-6 py-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</p>
          <h2 className="text-2xl font-black text-slate-900">
            {users.length}
          </h2>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700 border border-red-200 shadow-sm">
          {error}
        </div>
      )}

      {/* Content Section */}
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-sm font-medium text-slate-500">Loading users...</p>
          </div>
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <p className="font-semibold text-slate-600">
            No users found.
          </p>
          <p className="mt-1 text-xs text-slate-400">Registered users will appear here once available.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4">User Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Registered Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {users.map((user, index) => (
                  <tr key={user._id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-xs font-bold text-slate-400">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white">
                          {(user.name || "U").charAt(0).toUpperCase()}
                        </div>
                        <span>{user.name || "Unnamed User"}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}