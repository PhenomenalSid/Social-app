import express from "express";
import {
  createPostController,
  deletePostController,
  getPostController,
  getTimelinePostsController,
  likeAndDislikePostController,
  updatePostController,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create-post", createPostController);
router.put("/update-post/:id", updatePostController);
router.delete("/delete-post/:id", deletePostController);
router.put("/like-post/:id", likeAndDislikePostController);
router.get("/get-post/:id", getPostController);
router.get("/get-timeline-posts", getTimelinePostsController);

export default router;
