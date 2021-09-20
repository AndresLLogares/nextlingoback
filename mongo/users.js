import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: false,
  },
  photo_profile: {
    type: String,
    required: false,
  },
  level: {
    type: Number,
    required: false,
    default: 1,
  },
  experience: {
    type: Number,
    required: false,
    default: 0,
  },
  uuid: {
    type: String,
    required: true,
  },
  lessonone: {
    type: Boolean,
    default: false,
    required: false,
  },
  lessontwo: {
    type: Boolean,
    default: false,
    required: false,
  },
  lessonthree: {
    type: Boolean,
    default: false,
    required: false,
  },
  last_date: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("users", userSchema);

export default user;
