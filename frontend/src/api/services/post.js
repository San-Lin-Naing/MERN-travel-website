import api from "../axios";
import endpoints from "../endpoints";

// Get all posts
export const getPosts = async () => {
  const response = await api.get(endpoints.post.list);
  return response.data.data;
};

// Get one post by ID
export const getPostById = async (id) => {
  const response = await api.get(endpoints.post.details(id));
  return response.data.data;
};

// Create post
export const createPost = async (data) => {
  const response = await api.post(
    endpoints.post.create,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update post
export const updatePost = async (id, data) => {
  const response = await api.patch(
    endpoints.post.update(id),
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete post
export const deletePost = async (id) => {
  const response = await api.delete(
    endpoints.post.delete(id)
  );

  return response.data;
};