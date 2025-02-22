import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../config";

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  isPasswordCorrect: (password: string) => boolean;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, unique: true, required: true },
    email: {
      type: String,
      required: true,
      unique: true, // not a validator. It's a convenient helper for building MongoDB unique indexes
      lowecase: true,
      trim: true,
      index: true, // for faster searching on basis of email
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

// encrypt password before saving
userSchema.pre("save", async function (next) {
  // We want to encrypt password only when password is changed i.e 1st time or whenever password changes
  // If user changes some other property and save, then we don't want to encrypt it again bcz password is not modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// custom document instance methods
userSchema.methods.isPasswordCorrect = async function (password: string) {
  // bcrypt.compare(plain text, encrypted password)
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // @ts-ignore
  return jwt.sign(
    {
      _id: this._id,
    },
    ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY, // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  // @ts-ignore
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = model("User", userSchema); // collection created with name `users` in the db
