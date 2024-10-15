const express = require("express");
const app = express();

app.use(express.json({ limit: "16kb" }));

// const {userRouter} =

module.exports = { app };
