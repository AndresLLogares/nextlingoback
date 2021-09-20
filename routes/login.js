import express from "express";
import User from "../mongo/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET } = process.env;
const secret = SECRET;
const Login = express.Router();

Login.post("/", async (req, res) => {
  const { email, password, date } = req.body;

  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ message: "Email or password does not match!" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          firstname: user.first_name,
          lastname: user.last_name,
        };
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            const diffTime = Math.abs(date - user.last_date);

            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (!user.last_date || diffDays > 1) {
              user.last_date = date;
              user.save();
            }
            res.json({
              message: "Welcome Back",
              token: token,
              username: user.username,
              level: user.level,
              last_date: user.last_date,
              email: user.email,
            });
          }
        );
      } else {
        return res.json({ message: "Password incorrect" });
      }
    });
  });
});

export default Login;
