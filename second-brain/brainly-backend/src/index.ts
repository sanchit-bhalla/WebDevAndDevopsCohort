import "dotenv/config";
import { Server } from "http";
import { connectDB } from "./db";
import { PORT } from "./config";
import { app } from "./app";

let server: Server;
try {
  connectDB()
    .then(() => {
      app.on("error", (err) => {
        console.log("ERR:", err);
        throw err;
      });

      server = app.listen(PORT || 8000, () => {
        console.log(`App is listening on port ${PORT || 8000}`);
      });
    })
    .catch((err) => {
      console.log(`SERVER DOWN !`, err);
    });
} catch (err) {
  console.log("DB not connected", err);
}

process.on("unhandledRejection", (err: any) => {
  console.log(err?.name, err?.message);
  console.log("Unhandled exception occured! Shutting down...");

  server?.close(() => {
    process.exit(1);
  });
});
