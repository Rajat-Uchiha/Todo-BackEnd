import express from "express";
import connectDb from "./ConnectDb/ConnectDb.js";
import authRouter from "./endpoints/auth.js";
import notesRouter from "./endpoints/notes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

await connectDb();

app.use("/", authRouter);
app.use("/", notesRouter);

app.listen(3001, () => {
  console.log("App is running");
});
