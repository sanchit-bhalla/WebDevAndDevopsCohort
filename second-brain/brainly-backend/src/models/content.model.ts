import { Schema, model } from "mongoose";

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: contentTypes,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Content = model("Content", contentSchema); // 'contents' model created in db
