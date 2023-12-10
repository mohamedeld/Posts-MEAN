const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  updatePost,
  deletePost,
  getPost,
  createPost,
} = require("../controller/postsController");

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
