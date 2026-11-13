import * as service from "./post.service.js";

export const listPosts = async (req, res, next) => {
  try {
    const posts =
      req.user?.role === "admin"
        ? await service.getAllPosts()
        : await service.getPublicPosts();

    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await service.getPostById(req.params.id);

    if (!post.published && req.user?.role !== "admin") {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({ data: post });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, price } = req.body;

    if (
      !title?.trim() ||
      !content?.trim() ||
      price === undefined ||
      price === ""
    ) {
      return res.status(400).json({
        message: "Title, content and price are required",
      });
    }

    const coverFile = req.files?.coverImage?.[0];
    const galleryFiles = req.files?.galleryImages || [];

    if (!coverFile) {
      return res.status(400).json({
        message: "Cover image is required",
      });
    }

    if (galleryFiles.length !== 4) {
      return res.status(400).json({
        message: "Exactly 4 gallery images are required",
      });
    }

    const coverImage = await service.uploadImage(coverFile);

    const galleryImages = await Promise.all(
      galleryFiles.map((file) => service.uploadImage(file))
    );

    const published =
      req.body.published === undefined
        ? true
        : req.body.published === "true" ||
        req.body.published === true;

    const post = await service.createPost(
      {
        ...req.body,
        price: Number(price),
        published,
        coverImage,
        galleryImages,
      },
      req.user.id
    );

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (req.files?.coverImage?.[0]) {
      data.coverImage = await service.uploadImage(
        req.files.coverImage[0]
      );
    }

    if (req.files?.galleryImages?.length) {
      if (req.files.galleryImages.length !== 4) {
        return res.status(400).json({
          message: "Upload exactly 4 gallery images",
        });
      }

      data.galleryImages = await Promise.all(
        req.files.galleryImages.map((file) =>
          service.uploadImage(file)
        )
      );
    }

    if (data.price !== undefined) {
      data.price = Number(data.price);
    }

    if (data.published !== undefined) {
      data.published = data.published === "true" ||
        data.published === true;
    }

    const post = await service.updatePost(
      req.params.id,
      data
    );

    res.json({
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const removePost = async (req, res, next) => {
  try {
    await service.deletePost(req.params.id);

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};