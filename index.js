const express = require("express");
const app = express();
require("dotenv").config();

// Set the PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Database Connection
const connectWithDb = require("./config/database");
connectWithDb();

// Middleware to parse JSON
app.use(express.json());

// Import and use the blog routes
const blog = require("./routes/blog");
app.use("/api/v1", blog);

// Define the homepage route
app.get("/", (req, res) => {
  res.send("This is the homepage");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});

