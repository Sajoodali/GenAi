import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/**
 * @name registerUser
 * @desc Register a new user
 * @access Public
 */
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Sab fields check
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }
        // Password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm password do not match." });
        }
        // Password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        // Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hash });

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        // Duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ message: "Username or email already exists. Please choose another one." });
        }
        console.error("Registration error:", error);
        res.status(500).json({ message: "An error occurred while registering the user. Please try again later." });
    }
};


