import { Schema, model } from "mongoose";

const linkSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Link = model("Link", linkSchema);
