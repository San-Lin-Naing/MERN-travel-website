import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getPostById } from "../api/services/post";
import { useAuth } from "../context/AuthContext";
import BookingModal from "../components/posts/BookingModal";

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load this travel package"
        );
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-5 font-medium text-slate-500">
            Preparing your travel experience...
          </p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <span className="text-5xl">🌍</span>

        <h2 className="mt-5 text-2xl font-bold text-slate-900">
          Travel package not found
        </h2>

        <p className="mt-2 text-slate-500">
          {error || "This travel package may no longer be available."}
        </p>

        <Link
          to="/posts"
          className="mt-7 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Explore Other Trips
        </Link>
      </div>
    );
  }

  const images = [
    post.coverImage,
    ...(post.galleryImages || []),
  ].filter(Boolean);

  const isUser = user?.role === "user";
  const mapQuery = post.mapLocation || post.destination;

  const mapEmbedUrl = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
    : "";

  const googleMapsUrl = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    : "";

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-16">

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[480px] overflow-hidden bg-slate-800 sm:h-[580px] lg:h-[650px]">

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/10" />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-12 pt-28 sm:px-8 lg:px-12">

            <Link
              to="/posts"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <span>←</span>
              Back to Travel Posts
            </Link>

            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                <span>📍</span>
                {post.destination}
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                {post.title}
              </h1>

              <div className="mt-7 flex flex-wrap items-center gap-5 text-sm font-medium text-white/90">
                <span className="flex items-center gap-2">
                  <span>🕒</span>
                  {post.duration || "Flexible duration"}
                </span>

                <span className="h-1 w-1 rounded-full bg-white/70" />

                <span className="flex items-center gap-2">
                  <span>🌏</span>
                  Explore the destination
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Image Gallery */}
        {images.length > 1 && (
          <section className="relative z-10 -mt-8 rounded-3xl border border-slate-100 bg-white p-3 shadow-xl sm:p-5">

            <div className="mb-4 flex items-center justify-between px-1">
              {/* <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Explore the destination
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Discover beautiful moments from this trip
                </p>
              </div> */}

              <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
                {images.length} Photos
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.slice(1, 5).map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={image}
                    alt={`${post.title} gallery ${index + 1}`}
                    className="h-36 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-52 lg:h-64"
                  />

                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Details and Booking */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">

          {/* Left Content */}
          <div className="min-w-0">

            {/* Section Heading */}
            {/* <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Travel Experience
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Discover Your Next Adventure
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                Everything you need to know before starting your next unforgettable journey.
              </p>
            </div> */}

            {/* Information Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="group rounded-3xl border  bg-emerald-100 p-6 transition hover:-translate-y-1 border-blue-300 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                  💰
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Package Price
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                  {Number(post.price).toLocaleString()}{" "}
                  <span className="text-base font-semibold text-blue-600">
                    MMK
                  </span>
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Travel package pricing
                </p>
              </div>

              <div className="group rounded-3xl border  bg-cyan-100 p-6 transition hover:-translate-y-1 border-red-300 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                  🗓️
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Trip Duration
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                  {post.duration || "Flexible"}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  Your travel experience
                </p>
              </div>
            </div>

            {/* Description */}
            <section className="mt-12">
              <div className="flex items-center gap-3">
                <div className="h-9 w-1 rounded-full bg-blue-600" />

                <h2 className="text-2xl font-extrabold text-slate-900">
                  About This Trip
                </h2>
              </div>

              <div className="mt-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600">
                  {post.content}
                </p>
              </div>
            </section>

            {/* Google Maps */}
            {mapQuery && (
              <section className="mt-12">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                      Find Your Way
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                      Destination Location
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      📍 {mapQuery}
                    </p>
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-blue-200 px-5 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                  >
                    Open in Maps ↗
                  </a>
                </div>

                <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
                  <iframe
                    title="Travel Destination Map"
                    src={mapEmbedUrl}
                    width="100%"
                    height="380"
                    className="rounded-2xl border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </section>
            )}
          </div>

          {/* Right Booking Card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

              <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-7 text-white">
                <p className="text-sm font-medium text-blue-100">
                  Your next journey starts here
                </p>

                <p className="mt-3 text-3xl font-extrabold">
                  {Number(post.price).toLocaleString()}
                  <span className="ml-2 text-base font-semibold text-blue-200">
                    MMK
                  </span>
                </p>

                <p className="mt-2 text-sm text-blue-100">
                  Package Price
                </p>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Ready for an Adventure?
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Make your travel dreams come true. Submit your booking and wait for admin confirmation.
                </p>

                <div className="my-6 space-y-4 border-y border-slate-100 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Destination</span>
                    <span className="max-w-[55%] text-right font-bold text-slate-800">
                      {post.destination}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-bold text-slate-800">
                      {post.duration || "Flexible"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Booking Status</span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      Admin Approval
                    </span>
                  </div>
                </div>

                {isUser && (
                  <button
                    type="button"
                    onClick={() => {
                      setMessage("");
                      setShowBooking(true);
                    }}
                    className="w-full rounded-full bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                  >
                    Book This Trip →
                  </button>
                )}

                {!user && (
                  <Link
                    to="/login"
                    state={{ from: `/posts/${post._id}` }}
                    className="block w-full rounded-full bg-blue-600 px-6 py-4 text-center font-bold text-white transition hover:bg-blue-700"
                  >
                    Login to Book →
                  </Link>
                )}

                {user?.role === "admin" && (
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <p className="text-sm font-medium text-slate-600">
                      Admin accounts cannot submit customer bookings.
                    </p>
                  </div>
                )}

                {message && (
                  <p className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-center text-sm font-medium text-green-700">
                    {message}
                  </p>
                )}

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <span>🔒</span>
                  Secure booking experience
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        {/* <section className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 to-indigo-900 px-6 py-12 text-center sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
            Explore More
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            The World Is Waiting for You
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">
            Discover more amazing destinations and find the perfect trip for your next adventure.
          </p>

          <Link
            to="/posts"
            className="mt-7 inline-block rounded-full bg-white px-8 py-3.5 font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
          >
            Explore More Trips →
          </Link>
        </section> */}
      </div>

      {/* Booking Modal */}
      {showBooking && isUser && (
        <BookingModal
          post={post}
          onClose={() => setShowBooking(false)}
          onSuccess={(successMessage) => {
            setMessage(successMessage);
          }}
        />
      )}
    </main>
  );
}
