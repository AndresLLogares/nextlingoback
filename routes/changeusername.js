import User from "../mongo/users.js";
import express from "express";
const ChangeUsername = express.Router();

ChangeUsername.post("/", async (req, res) => {
  const { email, username } = req.body;
  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      user.username = username;
      user.save();
      return res.json({ success: true });
    }
  });
});

export default ChangeUsername;
