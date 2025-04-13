const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const listEndpoints = require("express-list-endpoints"); // Debugging tool

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // ✅ Ensure this line exists

// ✅ MongoDB Connection Setup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/branbu";

console.log(`Connecting to MongoDB at: ${MONGO_URI}`);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ✅ List all available routes in the server
    console.log("✅ Available Routes:", listEndpoints(app));

    // ✅ Start the server
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// ✅ Basic test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Branbu API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});






