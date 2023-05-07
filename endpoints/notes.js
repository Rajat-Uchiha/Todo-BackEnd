import notesModel from "../Models/notes.js";
import express from "express";
// import mongoose from "mongoose";
// import Cookies from "js-cookie";
import { LocalStorage } from "node-localstorage";
const router = express.Router();
var localStorage = new LocalStorage("./scratch");

//!To get All the Notes of a particular user
const getAllNotes = async (req, res) => {
  // const userWho = Cookies.get("access_token");
  // const userWho = window.localStorage.getItem("userID");

  // console.log("Value of cookie " + userWho);
  // const userWho = "64510cbdba355792a65f380f";
  const { userWho } = req.body;
  try {
    const response = await notesModel.find({ userWho });
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send("All notes can't be fetched");
  }
};

router.post("/notes", getAllNotes);

//?---------------------------------------------------------------------------------------

//! To insert a new note in notes
router.post("/notes/new", async (req, res) => {
  const newNote = new notesModel(req.body);
  try {
    const response = await newNote.save();
    res.json(response);
  } catch (error) {
    res.json({ message: "Notes is not saved" });
  }
});
export default router;
