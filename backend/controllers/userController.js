import {
  deleteUser,
  followUser,
  getUser,
  unfollowUser,
  updateUser,
} from "../services/userServices.js";

import userModel from "../models/userModel.js";

export const updateUserController = async (req, res) => {
  if (req.body.isAdmin || req.body.userId == req.params.id) {
    try {
      const user = await updateUser(req.params.id, req.body);

      if (!user) {
        res.status(404).json("User not Found");
      }

      res.status(200).json({
        user,
        message: "Account has been updated Successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can only update your account");
  }
};

export const deleteUserController = async (req, res) => {
  if (req.body.isAdmin || req.body.userId == req.params.id) {
    try {
      await deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        message: "Account has been deleted Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can only delete your account");
  }
};

export const getUserController = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      res.status(404).json("User not Found");
    }
    res.status(200).json({ user, message: "Your user has been fetched!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const followUserController = async (req, res) => {
  try {
    const data = await followUser(req.params, req.body);
    const l = await userModel.findById(req.params.id);
    const f = await userModel.findById(req.body.userId);
    const s = { l, f };
    res
      .status(200)
      .json({ s, message: "You have followed the user successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const unfollowUserController = async (req, res) => {
  try {
    const data = await unfollowUser(req.params, req.body);
    const l = await userModel.findById(req.params.id);
    const f = await userModel.findById(req.body.userId);
    const s = { l, f };
    res
      .status(200)
      .json({ s, message: "You have unfollowed the user successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
