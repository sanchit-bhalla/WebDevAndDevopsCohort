require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserModal, TodoModal } = require("./db");
const { auth } = require("./auth");
const { z } = require("zod");

mongoose.connect(process.env.MONGO_URL, { dbName: "todo-app" });
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
  });
  // const { email, password, name } = req.body;
  const { success, data, error } = requiredBody.safeParse(req.body);

  if (error)
    return res
      .status(403)
      .json({ message: "Please provide the correct credentials", error });

  try {
    const { email, password, name } = data; // or req.body
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

app.post("/todo", auth, async function (req, res) {
  const { title, done } = req.body;
  const userId = req.userId;

  const requiredTodo = z.object({
    title: z.string().min(1, { message: "Title can't be empty" }),
    done: z.boolean(),
    userId: z.string().min(1),
  });

  const { error, data } = requiredTodo.safeParse({ title, done, userId });
  if (error) return res.status(403).json({ error });

  try {
    await TodoModal.create(data);

    return res.status(201).json({
      message: "Todo created successfully!",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Some error occured. Please try after sometime" });
  }
});

app.get("/user/todos", auth, async function (req, res) {
  const userId = req.userId;
  try {
    const todos = await TodoModal.find({ userId }).populate({
      path: "userId",
      select: "-password",
    });

    return res.status(200).json({
      todos,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Some error occured. Please try after sometime" });
  }
});

app.listen(process.env.PORT, (err) => {
  console.log("Server is running on port: " + process.env.PORT);
});
