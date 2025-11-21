import User from "../models/User.js";
import imagekit from "../config/imagekit.js";

export const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email } = req.body;

    const newAvatar = req?.file;

    let newAvatarURL = "";
    newAvatar?.buffer &&
      (newAvatarURL = await imagekit.upload({
        file: newAvatar?.buffer,
        fileName: newAvatar?.originalname,
        folder: "avatar",
      }));

    const updatedUser = {
      username,
      email,
      avatar: newAvatarURL?.url,
    };

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
