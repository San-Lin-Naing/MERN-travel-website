import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-slate-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}
