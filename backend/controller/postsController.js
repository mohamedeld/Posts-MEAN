const Post = require("../models/post");
exports.createPost = async (request, response, next) => {
  try {
    const post = await Post.create({
      title: request.body.title,
      content: request.body.content,
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
