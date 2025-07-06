import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentsByPost,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-comment", createComment);
router.delete("/delete-comment/:id", deleteComment);
router.get("/get-all-comment", protect, getAllComments);
router.get("/get-comments-by-post/:id", getCommentsByPost);

export default router;
