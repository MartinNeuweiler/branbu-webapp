const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require("validator");

const router = express.Router();

// Password validation function to check length and complexity
const validatePassword = (password) => {
  const minLength = 6;
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Check if the password meets the minimum length requirement
  if (password.length < minLength) {
    return "Password must be at least 6 characters long.";
  }

  // Check if the password contains letters, numbers, and special characters
  if (!regex.test(password)) {
    return "Password must contain at least one letter, one number, and one special character.";
  }

  return null;
};

// Register route for user sign-up
router.post("/register", async (req, res) => {
  try {
    const { email, password, role, social } = req.body;

    // Ensure that all required fields are provided
    if (!email || !password || !role || !social) {
      return res.status(400).json({ message: "Email, password, role, and social handle are required." });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate the password format
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // Check if the email is already in use
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    user = new User({ email, password: hashedPassword, role, social });
    await user.save();

    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return the token and user information in the response
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// Login route for user sign-in
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure that email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    // Check if the user exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return the token and user information in the response
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;




