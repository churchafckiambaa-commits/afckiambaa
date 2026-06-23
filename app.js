// app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";


import connectDB from "./config/connectDB.js"; // MongoDB connection
import authRoutes from "./routes/authRoutes.js";
import mpesaRoutes from "./routes/mpesaRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import messageRoutes from "./routes/messageRoute.js";

dotenv.config();

const app = express();

// ⭐ Connect to MongoDB
connectDB();

// ⭐ Middlewares
app.use(helmet()); // optional security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// ✅ CORS setup
const allowedOrigins = ["https://afckiambaa-psi.vercel.app"];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Manual headers (optional)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Serve uploads publicly
app.use("/uploads", express.static("uploads"));

// ⭐ Routes
app.use("/api/auth", authRoutes);
app.use("/api/mpesa", mpesaRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);

// Root health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "AFC Kiambaa API is running 🚀" });
});

// Ping route for cron / health
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong", status: "OK" });
});

// ⭐ Cron job to keep Render awake
cron.schedule("*/5 * * * *", async () => {
  try {
    const response = await axios.get("https://afckiambaa-as5f.onrender.com/ping");
    console.log(`Pinged server at ${new Date().toLocaleTimeString()}:`, response.data);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
