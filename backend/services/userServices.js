import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import userModel from "../models/userModel.js";

export const updateUser = async (userId, updateData) => {
  if (updateData.password) {
    try {
      updateData.password = await bcrypt.hashSync(updateData.password, 10);
    } catch (err) {
      throw err;
    }
  }
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (userId) => {
  try {
    await UserModel.findByIdAndDelete(userId);
  } catch (err) {
    throw err;
  }
};

export const getUser = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    return user;
  } catch (err) {
    throw err;
  }
};

export const followUser = async (leader, follower) => {
  if (leader.id === follower.userId) {
    throw new Error("You cannot follow yourself!");
  } else {
    try {
      const l = await userModel.findById(leader.id);
      const f = await userModel.findById(follower.userId);

      if (!l.followers.includes(follower.userId)) {
        await l.updateOne(
          { $push: { followers: follower.userId } },
          { new: true }
        );
        await f.updateOne({ $push: { followings: leader.id } }, { new: true });
        return { l, f };
      } else {
        throw new Error("You have already followed the user!");
      }
    } catch (error) {
      throw error;
    }
  }
};

export const unfollowUser = async (leader, follower) => {
  if (leader.id === follower.userId) {
    throw new Error("You cannot unfollow yourself!");
  } else {
    try {
      const l = await userModel.findById(leader.id);
      const f = await userModel.findById(follower.userId);

      if (l.followers.includes(follower.userId)) {
        await l.updateOne(
          { $pull: { followers: follower.userId } },
          { new: true }
        );
        await f.updateOne({ $pull: { followings: leader.id } }, { new: true });
        return { l, f };
      } else {
        throw new Error("You have not followed the user!");
      }
    } catch (error) {
      throw error;
    }
  }
};
