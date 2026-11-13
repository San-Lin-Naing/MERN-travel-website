
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../../api/services/post.js";

import AdminPostForm from "../../components/admin/AdminPostForm";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load Posts
  const loadPosts = useCallback(async () => {
    try {
      setError("");

      const data = await getPosts();

      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load posts"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Search Posts
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return posts;

    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const destination = post.destination?.toLowerCase() || "";
      const price = String(post.price ?? "").toLowerCase();

      return (
        title.includes(query) ||
        destination.includes(query) ||
        price.includes(query)
      );
    });
  }, [posts, searchQuery]);

  // Statistics
  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.published
  ).length;

  const draftPosts = posts.filter(
    (post) => !post.published
  ).length;

  // Create Post
  const handleCreate = () => {
    setEditingPost(null);
    setShowForm(true);
    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Edit Post
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  // Submit Post
  const handleSubmit = async (formData) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (editingPost) {
        await updatePost(editingPost._id, formData);
        setMessage("Post updated successfully!");
      } else {
        await createPost(formData);
        setMessage("Post created successfully!");
      }

      handleCancel();
      await loadPosts();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save post"
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete Post
  const handleDelete = async (post) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deletePost(post._id);

      setMessage("Post deleted successfully!");

      if (editingPost?._id === post._id) {
        handleCancel();
      }

      await loadPosts();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete post"
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Manage Travel Posts
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create, update, search and manage your travel packages.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-amber-700 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:from-amber-600 hover:to-cyan-700"
          >
            <span className="text-xl">+</span>
            Create New Post
          </button>
        )}
      </div>

      {/* Alert Messages */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <span className="font-bold">!</span>
          {error}
        </div>
      )}

      {message && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <span className="font-bold">✓</span>
          {message}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        {/* Total Posts */}
        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Posts
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                {totalPosts}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                All travel packages
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              📝
            </div>
          </div>
        </div>

        {/* Published */}
        <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Published Posts
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-green-600">
                {publishedPosts}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Visible to visitors
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
              🌐
            </div>
          </div>
        </div>

        {/* Drafts */}
        <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Draft Posts
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-amber-600">
                {draftPosts}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Not published yet
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
              📂
            </div>
          </div>
        </div>

      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {editingPost ? "Edit Travel Post" : "Create New Travel Post"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {editingPost
                  ? "Update your travel package information."
                  : "Fill in the details to create a new travel package."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          <AdminPostForm
            initialData={editingPost}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            saving={saving}
          />
        </section>
      )}

      {/* Posts Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-slate-200 p-5 sm:p-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Travel Posts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage all your travel packages.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              {filteredPosts.length} / {totalPosts} Posts
            </span>

          </div>

          {/* Search Input */}
          <div className="relative mt-5 max-w-xl">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
              🔍
            </span>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, destination or price..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 hover:text-red-500"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="p-12 text-center">
            <p className="text-sm font-medium text-slate-500">
              Loading travel posts...
            </p>
          </div>

        ) : posts.length === 0 ? (

          /* No Posts */
          <div className="p-12 text-center">

            <div className="text-5xl">📭</div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No posts yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first travel package to get started.
            </p>

            {!showForm && (
              <button
                type="button"
                onClick={handleCreate}
                className="mt-5 rounded-xlbg-gradient-to-r from-fuchsia-500 to-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:from-amber-600 hover:to-cyan-700"
              >
                + Create First Post
              </button>
            )}

          </div>

        ) : filteredPosts.length === 0 ? (

          /* No Search Results */
          <div className="p-12 text-center">

            <div className="text-5xl">🔎</div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No matching posts found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with another title, destination or price.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Clear Search
            </button>

          </div>

        ) : (

          /* Table */
          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-bold">
                    #
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Post Title
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Destination
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Price
                  </th>

                  <th className="px-6 py-4 font-bold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center font-bold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredPosts.map((post, index) => (

                  <tr
                    key={post._id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-5 text-slate-400">
                      {index + 1}
                    </td>

                    {/* Title */}
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900">
                        {post.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Travel Package
                      </p>
                    </td>

                    {/* Destination */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span>📍</span>
                        {post.destination || "—"}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">
                        {Number(post.price || 0).toLocaleString()} MMK
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      {post.published ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                          Draft
                        </span>
                      )}

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-2">

                        <button
                          type="button"
                          onClick={() => handleEdit(post)}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(post)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* Table Footer */}
        {!loading && filteredPosts.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">

            <p className="text-xs text-slate-500">
              Showing <span className="font-bold text-slate-700">{filteredPosts.length}</span> matching posts
              out of <span className="font-bold text-slate-700">{totalPosts}</span> total posts.
            </p>

          </div>
        )}

      </section>
    </div>
  );
}
