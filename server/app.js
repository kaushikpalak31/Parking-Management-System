const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dbConnection");

dotenv.config();

const app = express();

// Establish database connection
connectDatabase();

// Middleware to parse incoming JSON data
app.use(express.json());

// Default route
app.get("/", (req, res) => {
    res.status(200).send("Welcome! The API is up and running.");
});

// User-related routes
const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes); // Base route for user operations

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
