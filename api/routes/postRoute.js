import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-post", protect, createPost);
router.put("/update-post/:id", protect, updatePost);
router.delete("/delete-post/:id", protect, deletePost);
router.get("/get-all-posts", getAllPosts);
router.get("/get-single-post", getSinglePost);

export default router;
