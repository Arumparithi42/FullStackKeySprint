const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config(); // Optional: Allows reading local .env files during local testing

const app = express();

// Middleware
app.use(express.json());

// Update CORS to allow requests from your Vercel frontend link
app.use(cors({
  origin: "https://full-stack-key-sprint.vercel.app", 
  credentials: true
}));


// MongoDB connection - Uses Render Environment Variable, falls back to local for dev
const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/keysprint";

mongoose.connect(dbURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend and DB are ready!");
});

// Start server - Render dynamically assigns a port via process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
