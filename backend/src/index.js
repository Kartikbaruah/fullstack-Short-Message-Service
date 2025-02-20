import express from "express";
import dovenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from 'cors'

import {connectDB} from './lib/db.js'

import messageRoutes from "./routes/message.route.js"
import authRoutes from './routes/auth.route.js'

dovenv.config();
const app = express();

const PORT= process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use
 (cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()
});