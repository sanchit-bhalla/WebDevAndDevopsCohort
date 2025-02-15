import mongoose from "mongoose";
import { MONGODB_URI } from "../config";
import { DB_NAME } from "../constants";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MONGO DB connected! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGODB connection Failed!", err);
    process.exit(1);
  }
};
