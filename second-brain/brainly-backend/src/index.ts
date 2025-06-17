import "dotenv/config";
import { Server } from "http";
import { connectDB } from "./db";
import { PORT } from "./config";
import { app } from "./app";
import { initializeVectorStore } from "./vectorstore";

let server: Server;
try {
  connectDB()
    .then(() => {
      app.on("error", (err) => {
        console.log("ERR:", err);
        throw err;
      });

      // Initialize vectore store instance
      initializeVectorStore()
        .then(() => {
          server = app.listen(PORT || 8000, () => {
            console.log(`App is listening on port ${PORT || 8000}`);
          });
        })
        .catch((err) => {
          console.log("VectorStore not CONNECTED!");
        });
    })
    .catch((err) => {
      console.log(`SERVER DOWN !`, err);
    });
} catch (err) {
  console.log("DB not connected", err);
}

// Ensure clean exit
process.on("SIGINT", () => {
  console.log("Shutting down server...");

  server?.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err: any) => {
  console.log(err?.name, err?.message);
  console.log("Unhandled exception occured! Shutting down...");

  server?.close(() => {
    process.exit(1);
  });
});
