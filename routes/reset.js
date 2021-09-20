import express from "express";
import User from "../mongo/users.js";
import bcrypt from "bcrypt";
const Reset = express.Router();

Reset.post("/", async (req, res) => {
  const { email, newpassword } = req.body;

  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({
        message: "Email not found",
        success: false,
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newpassword, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((user) =>
              res.json({
                message: "You have a new password!",
                success: true,
              })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

export default Reset;
