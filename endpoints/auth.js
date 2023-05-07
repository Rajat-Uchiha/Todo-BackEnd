import express from "express";
import userModel from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const router = express.Router();

dotenv.config();

//!FOR SIGNUP
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (user) {
    return res.json({ message: "user already exist,Try different username" });
  }

  try {
    //*Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: "user registered success" });
  } catch (error) {
    res.json({ message: "User registeration failed" });
  }
});

//! FOR LOGIN

const SECRET_MSG = process.env.SECRET_MSG;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //* Check if username is there
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User doesn't exists." });
  }

  //* Check if password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect" });
  }

  //* Create Token
  const token = jwt.sign({ id: user._id }, SECRET_MSG);
  res.json({ token, userID: user._id });
});

export default router;
