import Post from "./post.model.js";
import cloudinary from "../../config/cloudinary.js";
import { Readable } from "stream";

export const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "travelmate/posts",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    Readable.from(file.buffer).pipe(stream);
  });
};

export const getPublicPosts = () =>
  Post.find({ published: true }).sort({ createdAt: -1 });

export const getAllPosts = () =>
  Post.find().sort({ createdAt: -1 });

export const getPostById = async (id) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const createPost = (data, userId) =>
  Post.create({
    title: data.title,
    content: data.content,
    destination: data.destination || "",
    price: data.price,
    duration: data.duration || "",
    coverImage: data.coverImage,
    galleryImages: data.galleryImages || [],
    mapLocation: data.mapLocation || "",
    published: data.published ?? true,
    createdBy: userId,
  });

export const updatePost = async (id, data) => {
  const allowed = {};

  for (const key of [
    "title",
    "content",
    "destination",
    "price",
    "duration",
    "coverImage",
    "galleryImages",
    "mapLocation",
    "published",
  ]) {
    if (data[key] !== undefined) {
      allowed[key] = data[key];
    }
  }

  const post = await Post.findByIdAndUpdate(
    id,
    { $set: allowed },
    { new: true, runValidators: true }
  );

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const deletePost = async (id) => {
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};