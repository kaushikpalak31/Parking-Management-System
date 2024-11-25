const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: [true, "First name is required"] },
        lastName: { type: String, required: [true, "Last name is required"] },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },
        password: { type: String, required: [true, "Password is required"] },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"],
            match: [/^\d{10}$/, "Phone number must be 10 digits"],
        },
    },
    { 
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" } // Custom timestamp field names
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
