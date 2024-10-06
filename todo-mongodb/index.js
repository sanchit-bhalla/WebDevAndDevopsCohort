require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserModal, TodoModal } = require("./db");
const { auth } = require("./auth");

mongoose.connect(process.env.MONGO_URL, { dbName: "todo-app" });
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModal.create({ email, password: hashedPassword, name });

    return res.status(201).json({ message: "You are signed up!" });
  } catch (err) {
    return res.status(409).json({ message: "email already exists" });
  }
});

app.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModal.findOne({
      email,
    });
    console.log({ user });
    if (!user)
      return res.status(401).json({
        message: "Incorrect credentials",
      });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(401).json({
        message: "Incorrect credentials",
      });

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Please try after sometime" });
  }
});

app.post("/todo", auth, async function (req, res) {});

app.get("/todos", function (req, res) {});
app.listen(process.env.PORT, (err) => {
  console.log("Server is running on port: " + process.env.PORT);
});
