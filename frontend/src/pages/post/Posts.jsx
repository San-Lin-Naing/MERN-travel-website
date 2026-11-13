import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getPosts } from "../../api/services/post";
import PostCard from "../../components/posts/PostCard";
import { Search } from "lucide-react"; 

const POSTS_PER_PAGE = 8;

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    try {
      setError("");
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load travel posts"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Search filtering
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return posts.filter((post) => {
      return (
        post.title?.toLowerCase().includes(query) ||
        post.destination?.toLowerCase().includes(query) ||
        post.duration?.toLowerCase().includes(query) ||
        String(post.price || "").includes(query)
      );
    });
  }, [posts, searchQuery]);

  // Total pages
  const totalPages = Math.ceil(
    filteredPosts.length / POSTS_PER_PAGE
  );

  // Current page posts
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  // Reset page when searching
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* ================= 1. Background Image Header Section ================= */}
      <div 
        className="relative bg-cover bg-center py-30 px-4 sm:px-6 lg:px-8 mt-0"
        style={{ backgroundImage: `url('/public/images/images.jpg')` }} // <-- ကိုယ်ထည့်ချင်တဲ့ ပုံလင့်ခ် (သို့) import လုပ်ထားသော ပုံကို ထည့်ရန်
      >
        {/* Dark Overlay (စာသားများ ပိုမိုထင်ရှားစေရန် နောက်ခံအမည်းဖျော့ဖျော့ ခံခြင်း) */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Header Content */}
        <div className="relative max-w-7xl mx-auto z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif tracking-tight">
            List of Destination
          </h1>

          <p className="mt-3 text-base md:text-lg text-slate-200 max-w-2xl font-light">
           Fantastic state, Wonderful nature & Excellent service, Explore nature with low price
          </p>

          {/* Search Bar with Button Inside */}
          <div className="mt-8 max-w-2xl">
            <div className="flex items-center bg-white rounded-full p-2 shadow-2xl">
              <span className="pl-4 text-slate-400">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Find something here..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-transparent px-3 py-2 text-slate-800 placeholder-slate-400 outline-none text-base"
              />
              <button 
                type="button"
                className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-2.5 rounded-full transition shadow-md"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. Posts & Cards Section ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">

        {/* Error */}
        {error && (
          <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Loading */}
        {loading ? (
          <p className="py-12 text-center text-slate-500">
            Loading travel posts...
          </p>
        ) : filteredPosts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed p-10 text-center text-slate-500">
            No travel posts found.
          </div>
        ) : (
          <>
            {/* Post Cards: 4 columns */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {currentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

                {/* Previous */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                 ◁ Previous
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next ▷
                </button>

              </div>
            )}

            {/* Page Info */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Showing {currentPosts.length} of {filteredPosts.length} posts
              {" "} — Page {currentPage} of {totalPages}
            </p>
          </>
        )}
      </section>
    </div>
  );
}