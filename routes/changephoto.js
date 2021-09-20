import User from "../mongo/users.js";
import express from "express";
const ChangePhoto = express.Router();

ChangePhoto.post("/", async (req, res) => {
  const { email, photo } = req.body;
  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      user.photo_profile = photo;
      user.save();
      return res.json({ success: true });
    }
  });
});

export default ChangePhoto;
