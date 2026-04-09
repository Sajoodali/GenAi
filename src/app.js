import express  from "express";
import { authrouter } from "./routes/auth.routes";


const app = express();
app.use(express.json());

// Auth routes
app.use("/api/auth", authrouter);


export default app;