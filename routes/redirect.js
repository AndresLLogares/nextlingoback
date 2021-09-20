import express from "express";
import User from "../mongo/users.js";

const Redirect = express.Router();

Redirect.get("/", async (req, res) => {
  let hash = req.query.Link;

  let user = req.query.User;

  await User.findOne({ email: user }).then((user) => {
    if (!user) {
      return res.redirect("https://nextlingo.vercel.app");
    } else {
      if (hash === user.hash) {
        return res.redirect("https://nextlingo.vercel.app/reset");
      } else {
        res.redirect("https://nextlingo.vercel.app");
      }
    }
  });
});

export default Redirect;
