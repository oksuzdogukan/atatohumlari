import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  name: {
    type: String,
    required: [true, "İsim zorunlu"],
  },
  content: {
    type: String,
    required: [true, "Yorum içeriği zorunlu"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
