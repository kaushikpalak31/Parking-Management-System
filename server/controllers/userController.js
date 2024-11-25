const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Validate input fields
    if (![firstName, lastName, email, password, phoneNumber].every(Boolean)) {
        return res.status(400).json({ error: "All fields must be filled" });
    }

    // Check if the email is already in use
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ error: "Email is already registered" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
    });

    if (user) {
        return res.status(201).json({
            message: "User successfully registered",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } else {
        return res.status(500).json({ error: "Failed to register user" });
    }
});

// @desc    Log in a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate credentials
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User does not exist" });
    }

    // Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return success response
    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    });
});

module.exports = { registerUser, loginUser };
