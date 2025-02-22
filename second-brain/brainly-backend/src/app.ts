import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./config";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN, // Configures the `Access-Control-Allow-Origin` CORS header. We generally want to allow our frontend app origin only
    credentials: true, // Configures the `Access-Control-Allow-Credentials` CORS header. Set to true to pass the header, otherwise it is omitted.
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.headersSent) return next(err);
  // console.log({ err });

  res.status(err.statusCode || 500);
  const errObj: {
    message?: string;
    errors?: any;
    data?: any;
  } = {};
  if (err?.message) errObj["message"] = err?.message;
  if (err?.errors) errObj["errors"] = err?.errors;
  if (err?.data) errObj["data"] = err?.data;

  res.json(errObj);
});
