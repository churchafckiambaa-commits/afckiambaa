// app.js
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/connectDB.js"; // MongoDB connection
import authRoutes from "./routes/authRoutes.js";
import mpesaRoutes from "./routes/mpesaRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import messageRoutes from "./routes/messageRoute.js";

dotenv.config();

const app = express();

// ⭐ Connect to MongoDB
connectDB();

// ⭐ 1. FIRST: CORS Setup (Must be before Helmet and Body Parsers!)
const allowedOrigins = ["https://afckiambaa-psi.vercel.app"];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or your internal cron ping)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ⭐ 2. SECOND: Security & Logging Middlewares
app.use(helmet()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ❌ REMOVED: Your manual app.use((req, res, next) => { ... }) block is completely deleted.

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