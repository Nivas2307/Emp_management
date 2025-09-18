// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const logger = require("./middleware/logger");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

// 🔹 Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Allow Vercel frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // needed for multer form-data
app.use(logger);

// 🔹 File uploads (local vs production)
if (process.env.NODE_ENV === "production") {
  // ⚠️ IMPORTANT: In production use cloud storage (S3, Cloudinary, etc.)
  // This is just a placeholder until you set up external storage
  console.log("⚠️ Running in production. Use cloud storage for uploads!");
} else {
  // Serve local uploads folder in dev
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

// 🔹 Routes
app.use("/api/auth", authRoutes); // signup/login routes
app.use("/api", employeeRoutes);  // employee CRUD routes

// 🔹 Error handler (must be last middleware)
app.use(errorHandler);

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
