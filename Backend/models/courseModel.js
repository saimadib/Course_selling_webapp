const { urlencoded } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: [true, "Course descriptoin is required."],
    },
    price:{
        type:String,
        required:[true,"Course price is required"],
    },
    image:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const course = mongoose.model("course", courseSchema);

module.exports = course;
