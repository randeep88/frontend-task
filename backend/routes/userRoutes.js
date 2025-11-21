import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";
import { getCurrentUser, updateUser } from "../controllers/User.js";
const userRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

userRouter.get("/get-current-user", verifyToken, getCurrentUser);
userRouter.patch(
  "/update-user",
  verifyToken,
  upload.single("avatar"),
  updateUser
);

export default userRouter;
