const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");
const { MONGODB_URI } = require("../config");
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDb connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGODB connection Failed!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
