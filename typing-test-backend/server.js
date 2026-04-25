const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(
  "mongodb://localhost:27017/keysprint"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend and DB are ready!");
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));

