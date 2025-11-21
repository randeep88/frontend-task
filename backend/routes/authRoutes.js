import express from "express";
import multer from "multer";
import { register, login } from "../controllers/Auth.js";

const authRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

authRouter.post("/login", login);
authRouter.post("/register", upload.single("avatar"), register);

export default authRouter;
