import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import genreRoutes from "./routes/genreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";

import connectDB from "./config/db.js";
dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/uploads", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
