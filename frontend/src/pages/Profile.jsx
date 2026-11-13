import { useCallback, useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../api/services/profile";

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  role: "",
  createdAt: "",
};

export default function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyProfile();

      setProfile(data);
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
        avatar: data.avatar || "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const updatedProfile = await updateMyProfile(form);

      setProfile(updatedProfile);
      setForm({
        name: updatedProfile.name || "",
        phone: updatedProfile.phone || "",
        address: updatedProfile.address || "",
        avatar: updatedProfile.avatar || "",
      });

      setIsEditing(false);
      setMessage("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      avatar: profile.avatar || "",
    });

    setError("");
    setMessage("");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  if (error && !profile.email) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl bg-red-50 p-5 text-red-700">
          <p role="alert">{error}</p>

          <button
            type="button"
            onClick={loadProfile}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const initial = (profile.name || profile.email || "U")
    .charAt(0)
    .toUpperCase();

  const formattedMemberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : "Not available";

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 mt-9">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 mt-8">

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your personal information.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <p
            role="alert"
            className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700"
          >
            {message}
          </p>
        )}

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8 relative pb-12">
            <div className="flex flex-wrap items-center gap-5">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="h-20 w-20 rounded-full border-4 border-white/70 bg-white object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/70 bg-white text-3xl font-bold text-blue-700">
                  {initial}
                </div>
              )}

              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {profile.name || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  {profile.email}
                </p>

                <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold capitalize">
                  {profile.role || "user"} account
                </span>
              </div>
            </div>

            {/* Member Since badge positioned at the bottom center junction */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-md text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-1.5 z-10 whitespace-nowrap">
              <span className="text-slate-400">Member Since:</span>
              <span className="font-semibold text-blue-600">{formattedMemberSince}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Keep your contact details up to date.
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setMessage("");
                    setIsEditing(true);
                  }}
                  className="rounded-3xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    disabled={!isEditing || saving}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    disabled
                    value={profile.email || ""}
                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-slate-500"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Email cannot be changed here.
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={25}
                    disabled={!isEditing || saving}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="role"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Account Role
                  </label>

                  <input
                    id="role"
                    disabled
                    value={profile.role || "user"}
                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 capitalize text-slate-500"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    maxLength={300}
                    disabled={!isEditing || saving}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>

                {/* Avatar URL */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="avatar"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Profile Picture URL
                  </label>

                  <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    maxLength={500}
                    disabled={!isEditing || saving}
                    value={form.avatar}
                    onChange={handleChange}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Browser မှာတင်ထားတဲ့ ပုံတစ်ပုံ ရဲ့ image address ကိုယူပြီးဖြည့်ပါ။
                  </p>
                </div>
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={handleCancel}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}