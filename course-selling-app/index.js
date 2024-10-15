const dotevn = require("dotenv");
dotevn.config({
  path: "./.env",
});
const connectDB = require("./db");
const { app } = require("./app");

const { PORT, ACCESS_TOKEN_EXPIRY } = require("./config");

let server;
try {
  connectDB()
    .then(() => {
      app.on("error", (err) => {
        console.log("ERR:", err);
        throw err;
      });

      server = app.listen(PORT || 8000, () => {
        console.log(`server is running at port: ${PORT || 8000}`);
      });
    })
    .catch((err) => {
      console.log(`SERVER DOWN !`, err);
    });
} catch (err) {
  console.log("DB not connected", err);
}

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.mesage);
  console.log("Unhandled exception occured! Shutting down...");

  server?.close(() => {
    process.exit(1);
  });
});
