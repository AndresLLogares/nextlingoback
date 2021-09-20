import express from "express";
import User from "../mongo/users.js";
import bcrypt from "bcrypt";
const SignUp = express.Router();

SignUp.post("/", async (req, res) => {
  const { email, password, username, uuid } = req.body;

  await User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({ message: "Email already exists" });
    } else {
      const newUser = new User({
        email: email,
        password: password,
        username: username,
        uuid: uuid,
        lessons: [
          {
            one: false,
            two: false,
            three: false,
          },
        ],
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newProgress.save();
          newUser
            .save()
            .then((user) => res.json({ message: "Thanks for registering" }))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

export default SignUp;
