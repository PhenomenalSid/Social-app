import express from "express";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import postRoute from "./postRoute.js";

const router = express.Router();

const base = "api/v1";

router.use(`/${base}/users`, userRoute);
router.use(`/${base}/auth`, authRoute);
router.use(`/${base}/posts`, postRoute);

export default router;
