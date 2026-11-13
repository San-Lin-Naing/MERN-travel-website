import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  destination: "",
  content: "",
  price: "",
  duration: "",
  mapLocation: "",
  published: true,
};

export default function AdminPostForm({
  initialData,
  onSubmit,
  onCancel,
  saving,
}) {
  const [form, setForm] = useState(emptyForm);

  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [coverPreview, setCoverPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [imageError, setImageError] = useState("");

  useEffect(() => {
    setForm(
      initialData
        ? {
          destination: initialData.destination || "",
          title: initialData.title || "",
          content: initialData.content || "",
          price: String(initialData.price ?? ""),
          duration: initialData.duration || "",
          mapLocation: initialData.mapLocation || "",
          published: initialData.published ?? true,
        }
        : emptyForm
    );

    setCoverImage(null);
    setGalleryImages([]);

    setCoverPreview(initialData?.coverImage || "");
    setGalleryPreviews(initialData?.galleryImages || []);
    setImageError("");
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      return;
    }

    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
    setImageError("");
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length !== 4) {
      setImageError("Please select exactly 4 gallery images.");
      return;
    }

    if (files.some((file) => !file.type.startsWith("image/"))) {
      setImageError("All gallery files must be images.");
      return;
    }

    setGalleryImages(files);

    setGalleryPreviews(
      files.map((file) => URL.createObjectURL(file))
    );

    setImageError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setImageError("");

    if (!initialData && !coverImage) {
      setImageError("Please upload a cover image.");
      return;
    }

    if (!initialData && galleryImages.length !== 4) {
      setImageError("Please upload exactly 4 gallery images.");
      return;
    }

    const formData = new FormData();

    formData.append("destination", form.destination.trim());
    formData.append("title", form.title.trim());
    formData.append("content", form.content.trim());
    formData.append("price", String(Number(form.price)));
    formData.append("duration", form.duration.trim());
    formData.append("mapLocation", form.mapLocation.trim());
    formData.append("published", String(form.published));

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    galleryImages.forEach((file) => {
      formData.append("galleryImages", file);
    });

    onSubmit(formData);
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Title and Destination */}
      <div className="grid gap-5 sm:grid-cols-2">        
        <div>
          <label className="text-sm font-semibold">
            Destination *
          </label>

          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Bagan, Myanmar"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">
            Post Title *
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={120}
            className={inputClass}
            placeholder="Bagan Adventure"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div>
        <label className="text-sm font-semibold">
          Cover Image *
        </label>

        {coverPreview && (
          <img
            src={coverPreview}
            alt="Cover preview"
            className="mt-3 h-48 w-full rounded-xl object-cover"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className={inputClass}
        />

        <p className="mt-1 text-xs text-slate-500">
          Select one main cover image. Maximum 5 MB.
        </p>
      </div>

      {/* Gallery Images */}
      <div>
        <label className="text-sm font-semibold">
          Gallery Images (4 images) *
        </label>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryPreviews.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`Gallery preview ${index + 1}`}
              className="h-32 w-full rounded-lg object-cover"
            />
          ))}
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className={inputClass}
        />

        <p className="mt-1 text-xs text-slate-500">
          Select exactly 4 images together. When editing,
          leave this empty to keep the existing gallery.
        </p>
      </div>

      {/* Price and Duration */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">
            Price (MMK) *
          </label>

          <input
            name="price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="150000"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">
            Duration
          </label>

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className={inputClass}
            placeholder="3 days, 2 nights"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-semibold">
          Description *
        </label>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={5}
          maxLength={10000}
          className={inputClass}
          placeholder="Describe the travel package..."
        />
      </div>

      {/* Google Maps Location */}
      <div>
        <label className="text-sm font-semibold">
          Google Maps Location *
        </label>

        <input
          name="mapLocation"
          value={form.mapLocation}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Bagan, Myanmar"
        />

        <p className="mt-1 text-xs text-slate-500">
          Enter a destination name or paste a Google Maps URL.
        </p>
      </div>

      {/* Publish */}
      <label className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
        <input
          name="published"
          type="checkbox"
          checked={form.published}
          onChange={handleChange}
          className="h-4 w-4 accent-blue-600"
        />

        <span className="text-sm font-medium">
          Publish this travel package
        </span>
      </label>

      {imageError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {imageError}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving
            ? "Uploading and Saving..."
            : initialData
              ? "Save Changes"
              : "Create Post"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}