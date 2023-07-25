const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "An account with this username already exists."],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    purchasedCourse:[]
  },
  {
    timestamps: true,
  }
);

const User= mongoose.model("User", UserSchema);

module.exports =User;
