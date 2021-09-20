import User from "../mongo/users.js";
import express from "express";
const UserLevel = express.Router();

UserLevel.post("/", async (req, res) => {
  const { email, experience, lesson } = req.body;
  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      user.experience = user.experience + experience;
      user.experience === 100 ? (user.level = 2) : null;
      user.experience === 200 ? (user.level = 3) : null;
      if (lesson === "one") {
        user.lessonone = true;
      } else if (lesson === "two") {
        user.lessontwo = true;
      } else {
        user.lessonthree = true;
      }
      user.save();
      return res.json({ success: true });
    }
  });
});

export default UserLevel;
