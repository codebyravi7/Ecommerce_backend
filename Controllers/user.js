import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user register
export const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log(name,email,username,password)
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.json({ message: "User Already exist", success: false });

    const hashPass = await bcrypt.hash(password, 10);
    user = await User.create({ name, email,username, password: hashPass });
    res.json({
      message: "User Registered successfully!!! ...",
      user,
      success: true,
    });
  } catch (err) {
    res.json({ message: err.message +"error from ::controller" });
  }
};

//user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not find!!", success: false });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Invalid credentials", success: false });
    } else {
      const token = jwt.sign({ userId: user._id }, "!@##@$@!%%&!", {
        expiresIn: "365d",
      });
      res.json({ message: `Welcome ${user.name}`, token, success: true });
    }
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

//get all users
export const users = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch {
    res.json(error.message);
  }
};

export const profile = async (req, res) => {
  return res.json({ user: req.user });
};
