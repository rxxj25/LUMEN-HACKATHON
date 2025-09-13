// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// example protected route
import { protect } from "./middleware/authMiddleware.js";
app.get("/api/dashboard", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}`, user: req.user });
});

// health
app.get("/", (req, res) => res.send("API is running"));

// connect db and start
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing in .env");
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};
start();
