import Post from "../models/Post.js";
import slugify from "slugify";

export const createPost = async (req, res) => {
  const { title, content, image, category } = req.body;

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const newPost = new Post({
      title,
      content,
      image,
      category,
      slug,
    });
    await newPost.save();
    return res.status(201).json({ message: "Post olusturuldu", post: newPost });
  } catch (error) {
    return res.status(500).json({
      message: "Post olusturulurken bir hata oluştu",
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Postlar alinamadi", error: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      res.status(404).json({ message: "Post bulunamadi!!" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Post bulunamadi", error: error.message });
  }
};

// sadece admin
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, image } = req.body;

  try {
    const updateData = {
      content,
      category,
      image,
    };

    if (title) {
      updateData.title = title;
      updateData.slug = slugify(title, { lower: true, strict: true });
    }
    const post = await Post.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Post guncellenemedi", error: error.message });
  }
};

// sadece admin
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post silindi", post: post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Post silinemdi", error: error.message });
  }
};
