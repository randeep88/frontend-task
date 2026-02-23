import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import imagekit from "../config/imagekit.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Avatar is required" });
    }

    const avatar = req?.file;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!avatar) {
      return res
        .status(400)
        .json({ message: "Avatar is required", success: false });
    }

    let avatarURL = "";
    avatar?.buffer &&
      (avatarURL = await imagekit.upload({
        file: avatar?.buffer,
        fileName: avatar?.originalname,
        folder: "avatar",
      }));

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: avatarURL.url,
    });

    return res.status(200).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      data: user,
      token,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
