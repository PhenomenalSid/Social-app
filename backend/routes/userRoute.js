import express from "express";
import {
  deleteUserController,
  followUserController,
  getUserController,
  unfollowUserController,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.put("/follow/:id", followUserController);
router.put("/unfollow/:id", unfollowUserController);

export default router;
