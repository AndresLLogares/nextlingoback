import express from "express";
import User from "../mongo/users.js";
import { OAuth2Client } from "google-auth-library";
const { GoogleId } = process.env;

const Google = express.Router();

const client = new OAuth2Client(GoogleId);

Google.post("/", async (req, res) => {
  const { email, username, googleId, tokenId, uuid, date } = req.body;

  await client
    .verifyIdToken({ idToken: tokenId, audience: GoogleId })

    .then(async () => {
      await User.findOne({ email: email }).then((user) => {
        if (!user) {
          const newUser = new User({
            username: username,
            email: email,
            googleId: googleId,
            last_date: date,
            uuid: uuid,
            lessons: [
              {
                one: false,
                two: false,
                three: false,
              },
            ],
          });
          newUser
            .save()
            .then((user) =>
              res.json({
                email: user.email,
                username: user.username,
                success: true,
                token: "Bearer " + tokenId,
                googleId: user.googleId,
                message: "Thanks for registering",
              })
            )
            .catch((err) => console.log(err));
        } else {
          res.json({
            email: user.email,
            username: user.username,
            success: true,
            message: "Welcome Back",
            token: "Bearer " + tokenId,
            googleId: user.googleId,
          });
        }
      });
    });
});

export default Google;
