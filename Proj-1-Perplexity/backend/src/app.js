/**
 * ============================================
 * Express Application Setup
 * ============================================
 * Core Express app configuration
 * - Middleware initialization
 * - Route registration
 * - Error handling
 */

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// ============================================
// Import Routes
// ============================================
import authRoutes from "./routes/auth.js";
import searchRoutes from "./routes/search.js";
import chatRoutes from "./routes/chat.js";

// ============================================
// Import Middleware & Error Handlers
// ============================================
import { errorHandler, notFoundHandler } from "./utils/errorHandler.js";

// ============================================
// Initialize Express App
// ============================================
const app = express();

// ============================================
// Middleware Configuration
// ============================================

/**
 * CORS Configuration
 * - Allows requests from frontend
 * - Configurable via environment or default to localhost
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/**
 * Body Parser Middleware
 * - Parses incoming JSON request bodies (limit: 10mb)
 * - Parses incoming form-encoded request bodies
 * - Parses cookies from Cookie header
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

/**
 * Request Logging Middleware (Development)
 * - Logs incoming requests with method, URL, and timestamp
 */
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(
      `📨 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    );
    next();
  });
}

// ============================================
// Health Check Endpoint
// ============================================

/**
 * Health Check Route
 * - Verifies server is running
 * - Used for monitoring and tests
 * Endpoint: GET /api/health
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============================================
// API Routes
// ============================================

/**
 * Authentication Routes
 * - POST /api/auth/register - Register new user
 * - POST /api/auth/login - User login
 * - POST /api/auth/refresh - Refresh JWT token
 */
app.use("/api/auth", authRoutes);

/**
 * Search Routes
 * - GET /api/search - Perform search query
 * - GET /api/search/history - Get search history
 */
app.use("/api/search", searchRoutes);

/**
 * Chat Routes
 * - POST /api/chat - Create new chat message
 * - GET /api/chat - Get user's chats
 * - GET /api/chat/:chatId - Get specific chat with messages
 * - DELETE /api/chat/:chatId - Delete chat
 */
app.use("/api/chat", chatRoutes);

// ============================================
// Error Handling & 404
// ============================================

/**
 * 404 Not Found Handler
 * - Catches all undefined routes
 * - Must be before error handler
 */
app.use(notFoundHandler);

/**
 * Global Error Handler
 * - Catches all errors from routes and middleware
 * - Formats error responses consistently
 * - Logs errors for debugging
 */
app.use(errorHandler);

export default app;
