import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const authRoute = express.Router();

//Regiter
authRoute.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Login
authRoute.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("wrong email");

    //to use bcrypt to hash the password we need to use this:

    // const validated = await bcrypt.compare(req.body.password, user.password);
    // !validated && res.status(400).json("wrong password")

    //for not sending the passWord on MongDB we need to exculed
    // const {password, ...otherElements } = user._doc

    // res.status(200).json(otherElements)

    res.status(200).json(user);
    console.log(req.body);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default authRoute;
