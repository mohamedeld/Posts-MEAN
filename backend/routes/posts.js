const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  storage,
  getAllPosts,
  updatePost,
  deletePost,
  getPost,
  createPost,
} = require("../controller/postsController");

router.get("/", getAllPosts);
router.post("/", multer({ storage }).single("image"), createPost);
router.get("/:id", getPost);
router.patch("/:id", multer({ storage }).single("image"), updatePost);
router.delete("/:id", deletePost);

module.exports = router;
