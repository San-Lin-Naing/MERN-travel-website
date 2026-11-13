import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: String,
      default: "",
    },

    // Main Cover Image URL
    coverImage: {
      type: String,
      default: "",
    },

    // Additional 4 Images
    galleryImages: {
      type: [String],
      default: [],
    },

    // Google Maps search location
    mapLocation: {
      type: String,
      default: "",
    },

    published: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;