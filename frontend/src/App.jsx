import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminBookings from "./pages/admin/AdminBookings.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Posts from "./pages/post/Posts.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Profile from "./pages/Profile.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminPosts from "./pages/admin/AdminPosts.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import UserList from "./components/admin/UserList.jsx";
import NotFound from "./pages/NotFound.jsx";
import AboutUs from "./pages/AboutUs.jsx";

// Scroll to top for each page
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root") || document.getElementById("app");

    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";
    body.style.margin = "0";
    body.style.padding = "0";
    html.style.scrollbarGutter = "stable";

    if (root) {
      root.style.maxWidth = "100%";
      root.style.overflowX = "hidden";
    }

    return () => {
      html.style.overflowX = "";
      body.style.overflowX = "";
      body.style.margin = "";
      body.style.padding = "";
      html.style.scrollbarGutter = "";

      if (root) {
        root.style.maxWidth = "";
        root.style.overflowX = "";
      }
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <ScrollToTopOnRouteChange />

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-6 bottom-16 z-50 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300
          ${
            showButton
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-6 pointer-events-none"
          }
          bg-gray-600 text-white hover:bg-amber-700`}
      >
        <ArrowUp size={18} />
      </button>

      {/* ============================================================================================== */}

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/about" element={<AboutUs />} />

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="users" element={<UserList />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
