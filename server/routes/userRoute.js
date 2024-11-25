const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser); // POST /api/users/register

// Route for user login
router.post("/login", loginUser); // POST /api/users/login

// Exporting the router to be used in the main application
module.exports = router;
