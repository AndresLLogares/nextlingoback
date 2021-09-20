import express from "express";
import NodeMailer from "nodejs-nodemailer-outlook";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../mongo/users.js";
dotenv.config();

const PassEmail = process.env.PASSEMAIL;

const SendEmail = express.Router();

SendEmail.post("/", async (req, res) => {
  let email = req.body.email;

  let link = "https://http://localhost:3000/reset";

  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ message: "Email does not match!" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(link, salt, (err, hash) => {
          if (err) throw err;
          NodeMailer.sendEmail({
            auth: {
              user: "nextlingo@hotmail.com",
              pass: PassEmail,
            },
            from: "nextlingo@hotmail.com",
            to: email,
            subject: "Do not reply to this e-mail",
            text: `Use this link to recover your Account, this link will only work for 24hs https:// http://localhost:5000/redirect/?Link=${hash}&User=${email}`,
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i),
          });
          user.hash = hash;
          user.save({
            expireAfterSeconds: 86400,
          });
          res.json({
            message: "E-Mail has been sent",
            success: true,
          });
        });
      });
    }
  });
});

export default SendEmail;
