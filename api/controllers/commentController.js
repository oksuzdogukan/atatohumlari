import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  const { post, username, content } = req.body;

  try {
    const newComment = new Comment({
      post,
      username,
      content,
    });

    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment Olusturuldu", comment: newComment });
  } catch (error) {
    res.status(500).json({
      message: "Comment olusturulurken bir hata oluştu",
      error: error.message,
    });
  }
};

export const getCommentsByPost = async (req, res) => {
  const { post } = req.params;
  try {
    const comment = await Comment.find({ post }).sort({ createdAt: -1 });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Comment Bulunamadi",
      error: error.message,
    });
  }
};

// sadece admin
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Commentler alinamadi",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment silindi" });
  } catch (error) {
    res.status(500).json({
      message: "Comment silinirken bir hata oluştu",
      error: error.message,
    });
  }
};
