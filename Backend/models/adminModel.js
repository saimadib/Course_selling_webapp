const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
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
    }
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
