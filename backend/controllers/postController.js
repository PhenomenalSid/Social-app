import postModel from "../models/postModel.js";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likeAndDislikePost,
  updatePost,
} from "../services/postServices.js";

export const createPostController = async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(200).json({ post, message: "Post created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePostController = async (req, res) => {
  try {
    const post = await updatePost(req.params, req.body);
    res
      .status(200)
      .json({ post, message: "Post has been updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePostController = async (req, res) => {
  try {
    await deletePost(req.params, req.body);
    res.status(200).json("Post has been deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const likeAndDislikePostController = async (req, res) => {
  try {
    await likeAndDislikePost(req.params, req.body);
    const data = await postModel.findById(req.params.id);
    res.status(200).json({
      data,
      message: "Like or Dislike operation has been executed successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPostController = async (req, res) => {
  try {
    const post = await getPost(req.params);
    res
      .status(200)
      .json({ post, message: "Post has been fetched successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTimelinePostsController = async (req, res) => {
  try {
    const timelinePosts = await getTimelinePosts(req.body);
    res.status(200).json({
      timelinePosts,
      message: "Timeline Post fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post fetch failed",
      err,
    });
  }
};
