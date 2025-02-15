import "dotenv/config";
import express from "express";

const app = express();
import { PORT } from "./config";

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/hia", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT || 8000, () => {
  console.log(`App is listening on port ${PORT || 8000}`);
});
