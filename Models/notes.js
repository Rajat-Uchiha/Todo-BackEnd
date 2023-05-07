// ! NOTES MODEL

import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userWho: {
    type: String,
    required: true,
  }, //* To have a reference between the user schema and the notes schema
  date: { type: Date, default: Date.now },
});
const notesModel = mongoose.model("notes", notesSchema);
export default notesModel;
