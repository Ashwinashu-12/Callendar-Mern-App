import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    let { username, name, email, password } = req.body;

    // if frontend sent "name" instead of "username", map it
    if (!username && name) {
      username = name;
    }

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      name: name || username, // save name if provided
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully ✅", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};
