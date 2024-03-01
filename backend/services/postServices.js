import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const createPost = async (body) => {
  try {
    const post = new postModel(body);
    await post.save();
    return post;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (head, body) => {
  const p = await postModel.findById(head.id);

  if (p.userId === body.userId) {
    try {
      const post = await postModel.findByIdAndUpdate(
        head.id,
        { $set: body },
        {
          new: true,
        }
      );
      return post;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("You can only update your post");
  }
};

export const deletePost = async (head, body) => {
  const p = await postModel.findById(head.id);

  if (p.userId === body.userId) {
    try {
      const post = await postModel.findByIdAndDelete(head.id);
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("You can only delete your post");
  }
};

export const likeAndDislikePost = async (head, body) => {
  try {
    const post = await postModel.findById(head.id);

    if (post.likes.includes(body.userId)) {
      await post.updateOne(
        { $pull: { likes: body.userId } },
        {
          new: true,
        }
      );
    } else {
      await post.updateOne(
        { $push: { likes: body.userId } },
        {
          new: true,
        }
      );
    }
    return post;
  } catch (error) {
    throw error;
  }
};

export const getPost = async (head) => {
  try {
    const post = await postModel.findById(head.id);
    return post;
  } catch (error) {
    throw error;
  }
};

export const getTimelinePosts = async (body) => {
  try {
    const currentUser = await userModel.findById(body.userId);
    const userPosts = await postModel.find({ userId: currentUser._id });
    const timelinePosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return postModel.find({ userId: friendId });
      })
    );

    return userPosts.concat({ ...timelinePosts });
  } catch (error) {
    throw error;
  }
};
