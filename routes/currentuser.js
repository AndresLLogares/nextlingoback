import express from "express";
import User from "../mongo/users.js";

const CurrentUser = express.Router();

CurrentUser.post("/", async (req, res) => {
    const { email } = req.body;
  
    await User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.json({ message: "Email or password does not match!" });
      } else {
        return res.json({
            user
        });
      }
    });
  });
  
  export default CurrentUser;
  