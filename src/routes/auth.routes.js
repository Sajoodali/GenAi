import { Router } from "express";
import { registerUser } from "../controller/auth.controller.js";

const authrouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authrouter.post("/register", registerUser);

export default authrouter;


