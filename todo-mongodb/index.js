require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserModal, TodoModal } = require("./db");

mongoose.connect(
  `mongodb+srv://sanchitbhalla91:${process.env.DB_PASSWORD}@cluster0.schyqco.mongodb.net`,
  { dbName: "todo-app" }
);
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const { email, password, name } = req.body;

  try {
    await UserModal.create({ email, password, name });

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
      password,
    });
    console.log({ user });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        process.env.JWT_SECRET
      );
      return res.json({ token });
    } else {
      res.status(401).json({
        message: "Incorrect credentials",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Please try after sometime" });
  }
});

app.post("/todo", function (req, res) {});
app.get("/todos", function (req, res) {});
app.listen(process.env.PORT, (err) => {
  console.log("Server is running on port: " + process.env.PORT);
});
