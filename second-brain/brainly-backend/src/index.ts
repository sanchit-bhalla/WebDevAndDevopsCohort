import "dotenv/config";
import { connectDB } from "./db";
import { PORT } from "./config";
import { app } from "./app";

let server;
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
