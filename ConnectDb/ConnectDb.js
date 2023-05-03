import mongoose from "mongoose";

const connectionSTR =
  "mongodb+srv://rajat_todo:rajat_todo123@todocluster.qbwi1kz.mongodb.net/TodoApp?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    await mongoose.connect(connectionSTR);
    console.log("Connection to the database is established");
  } catch (err) {
    console.log("Connection to the db is not established");
  }
};

export default connectDb;
