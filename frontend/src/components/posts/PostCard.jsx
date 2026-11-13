import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-blue-50 shadow-sm shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl">

      <img
        src={post.coverImage || "/placeholder.jpg"}
        alt={post.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-2 flex flex-col items-center text-center">
        <span className="rounded-full bg-blue-100 px-3 py-1 mt-3 text-xs font-semibold text-blue-700">
          {post.destination || "Travel Destination"}
        </span>

        <h2 className="mt-4 text-lg font-bold text-slate-800">
          {post.title}
        </h2>

        <Link
          to={`/posts/${post._id}`}
          className="mt-4 mb-6 inline-block rounded-full bg-green-700 px-4 py-2 text-center font-semibold text-white hover:bg-emerald-800"
        >
          View Tour &gt;
        </Link>
      </div>
    </article>
  );
}