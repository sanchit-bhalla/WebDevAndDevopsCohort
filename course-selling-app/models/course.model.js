const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course Title is required!"],
      index: true,
    },
    description: {
      type: String, // cloudinary url
      required: [true, "Course description is required!"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      rquired: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema); // colletion name --> courses

module.exports = { Course };
