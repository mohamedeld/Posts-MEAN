const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const postRoutes = require("./routes/posts");
const path = require("path");
const app = express();
mongoose
  .connect(
    "mongodb+srv://mohamedazoz20010:8wV4dX5aX1HwTVFA@cluster0.cnekkbe.mongodb.net/"
  )
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(`Connection Failed: ${err.message}`));
app.use(express.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);

// app.post("/api/posts", async (request, response, next) => {
//   try {
//     const post = await Post.create({
//       title: request.body.title,
//       content: request.body.content,
//     });

//     response.status(201).json({
//       message: "post added successfully",
//       post,
//     });
//   } catch (error) {
//     response
//       .status(500)
//       .json({ message: "Failed to create post", error: error.message });
//   }
//   next();
// });
// app.get("/api/posts", async (request, response, next) => {
//   try {
//     const posts = await Post.find();
//     response.status(200).json({
//       message: "data fetched correctly",
//       posts,
//     });
//   } catch (error) {
//     response
//       .status(500)
//       .json({ message: "Failed to fetch posts", error: error.message });
//   }
//   next();
// });
// app.get("/api/posts/:id", async (request, response, next) => {
//   try {
//     const post = await Post.findById(request.params.id);
//     if (!post) {
//       response
//         .status(500)
//         .json({ message: "Failed to fetch post", error: error.message });
//     }
//     response.status(200).json({
//       message: "data fetched correctly",
//       post,
//     });
//   } catch (error) {
//     response
//       .status(500)
//       .json({ message: "Failed to fetch post", error: error.message });
//   }
//   next();
// });
// app.patch("/api/posts/:id", async (request, response, next) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       request.params.id,
//       {
//         _id: request.body._id,
//         title: request.body.title,
//         content: request.body.content,
//       },
//       { new: true }
//     );
//     if (!updatedPost) {
//       response
//         .status(500)
//         .json({ message: "Not found id or post", error: error.message });
//     }
//     response.status(200).json({
//       message: "updated post successfully",
//       updatedPost,
//     });
//   } catch (error) {
//     response
//       .status(500)
//       .json({ message: "Failed to update post", error: error.message });
//   }
// });

// app.delete("/api/posts/:id", async (request, response, next) => {
//   try {
//     const post = await Post.findByIdAndDelete(request.params.id);
//     if (!post) {
//       response
//         .status(500)
//         .json({ message: "Failed to delete post", error: error.message });
//     }
//     response.status(200).json({
//       message: "Delete Successfully",
//     });
//   } catch (error) {
//     response
//       .status(500)
//       .json({ message: "Failed to delete post", error: error.message });
//   }
// });

module.exports = app;
