const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  ADMIN_ACCESS_TOKEN_SECRET,
  ADMIN_REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} = require("../config");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // not a validator. It's a convenient helper for building MongoDB unique indexes
      lowercase: true,
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
  { timestamps: true }
);

// encrypt password before saving
adminSchema.pre("save", async function (next) {
  // We want to encrypt password only when password is changed i.e 1st time or whenever password changes
  // If user changes some other property and save, then we don't want to encrypt it again bcz password is not modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// custom document instance methods
adminSchema.methods.isPasswordCorrect = async function (password) {
  // bcrypt.compare(plain text, encrypted password)
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    ADMIN_ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY, // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
    }
  );
};

adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    ADMIN_REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

const Admin = mongoose.model("Admin", adminSchema); // collection created with name `admins` in the db
module.exports = { Admin };
