import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { passportconfig } from "./validation/validation.js";
import passport from "passport";
import Login from "./routes/login.js";
import SingUp from "./routes/signup.js";
import Google from "./routes/google.js";
import SendEmail from "./routes/sendemail.js";
import CurrentUser from "./routes/currentuser.js";
import Redirect from "./routes/redirect.js";
import Reset from "./routes/reset.js";
import UserLevel from "./routes/userlevel.js";
import ChangeUsername from "./routes/changeusername.js";
import ChangePhoto from "./routes/changephoto.js";

dotenv.config();

const app = express();

const { PORT } = process.env || 5000;

const MongoURL = process.env.MongoURL;

const CONNECTION_URL = MongoURL;

app.use(bodyparser.json({ limit: "30mb", extende: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extende: true }));
app.use(cors());

app.use(morgan("dev"));

app.use(passport.initialize());

app.use(passport.session());

passportconfig(passport);

app.use(morgan("dev"));

app.use("/login", Login);
app.use("/signup", SingUp);
app.use("/currentuser", CurrentUser);
app.use("/google", Google);
app.use("/sendemail", SendEmail);
app.use("/reset", Reset);
app.use("/redirect", Redirect);
app.use("/userlevel", UserLevel);
app.use("/changeusername", ChangeUsername);
app.use("/changephoto", ChangePhoto);

app.get("/", (req, res) => {
  res.send("Welcome to NextLingo");
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on server ${PORT}`))
  )
  .catch((error) => console.log(error.message));
