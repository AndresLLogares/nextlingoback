import JwtStrategy from "passport-jwt";
let JwtStrategyS = JwtStrategy.Strategy;
import ExtractJwt from "passport-jwt";
let ExtractJwtaux = ExtractJwt.ExtractJwt;
import mongoose from "mongoose";
import User from "../mongo/users.js";
import dotenv from "dotenv";
import passport from "passport";
dotenv.config();
const secret = process.env.SECRET;
console.log(secret);
const opts = {};
opts.jwtFromRequest = ExtractJwtaux.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

export const passportconfig = (passport) => {
  passport.use(
    new JwtStrategyS(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
