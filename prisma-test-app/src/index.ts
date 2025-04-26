import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
  const { username, age, city, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 16);

    const result = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        age,
        city,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Some error occured" });
  }
});

app.get("/users", async (req, res) => {
  try {
    // const startTime = Date.now();
    const users = await prisma.users.findMany();
    // const endTime = Date.now();
    // const timetaken = (endTime - startTime) / 1000;
    res.json({ users });
  } catch (err) {
    console.log("Error: ", err);
    res.json({ users: [] });
  }
});

// Find todos of user
app.get("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userWithTodos = await prisma.users.findFirst({
      where: { id: Number(userId) },
      select: {
        username: true,
        todos: true,
      },
    });

    res.json({ userWithTodos });
  } catch (err) {
    console.log("Error: ", err);
    res.json({ message: "Some error occured" });
  }
});

const server = app.listen(3000, () => {
  console.log("Server is runnig on port 3000...");
});
