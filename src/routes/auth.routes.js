import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controller/auth.controller.js";

const authrouter = Router();

/**
 * @route POST /register , /login , /logout
 * @name registerUser , loginUser , logoutUser
 * @desc Register a new user, Login a user and Logout a user
 * @access Public
 */
authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);
authrouter.post("/logout", logoutUser);

export default authrouter;


