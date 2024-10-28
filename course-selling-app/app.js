const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CORS_ORIGIN } = require("./config");

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN, // Configures the `Access-Control-Allow-Origin` CORS header. We generally want to allow our frontend app origin only
    credentials: true, // Configures the `Access-Control-Allow-Credentials` CORS header. Set to true to pass the header, otherwise it is omitted.
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const { userRouter } = require("./routes/user.routes");

app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.log({ err });
  res.status(err.statusCode || 500);
  const errObj = {};
  if (err.message) errObj["message"] = err.message;
  if (err.errors) errObj["errors"] = err.errors;
  if (err.data) errObj["data"] = err.data;

  res.json(errObj);
});
module.exports = { app };
