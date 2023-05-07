import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const connectionSTR = process.env.CONNECTION_STR;

const connectDb = async () => {
  try {
    await mongoose.connect(connectionSTR);
    console.log("Connection to the database is established");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
