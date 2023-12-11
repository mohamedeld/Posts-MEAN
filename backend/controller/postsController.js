const Post = require("../models/post");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];

    if (isValid) {
      cb(null, "backend/images");
    } else {
      const error = new Error("Invalid mime type");
      cb(error, "backend/images");
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

exports.createPost = async (request, response, next) => {
  const url = request.protocol + "://" + request.get("host");
  try {
    const post = await Post.create({
      title: request.body.title,
      content: request.body.content,
      imagePath: url + "/images/" + request.file.filename,
    });

    response.status(201).json({
      message: "post added successfully",
      post,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
  next();
};
exports.getAllPosts = async (request, response, next) => {
  try {
    const posts = await Post.find();
    response.status(200).json({
      message: "data fetched correctly",
      posts,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.message });
  }
  next();
};
exports.getPost = async (request, response, next) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      response
        .status(500)
        .json({ message: "Failed to fetch post", error: error.message });
    }
    response.status(200).json({
      message: "data fetched correctly",
      post,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Failed to fetch post", error: error.message });
  }
  next();
};
exports.updatePost = async (request, response, next) => {
  try {
    let imagePath = request.body.imagePath;
    if (request.file) {
      const url = request.protocol + "://" + request.get("host");
      imagePath = url + "/images/" + request.file.filename;
    }
    const updatedPost = await Post.findByIdAndUpdate(
      request.params.id,
      {
        _id: request.body._id,
        title: request.body.title,
        content: request.body.content,
      },
      { new: true }
    );
    if (!updatedPost) {
      response
        .status(500)
        .json({ message: "Not found id or post", error: error.message });
    }
    response.status(200).json({
      message: "updated post successfully",
      updatedPost,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

exports.deletePost = async (request, response, next) => {
  try {
    const post = await Post.findByIdAndDelete(request.params.id);
    if (!post) {
      response
        .status(500)
        .json({ message: "Failed to delete post", error: error.message });
    }
    response.status(200).json({
      message: "Delete Successfully",
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
};
