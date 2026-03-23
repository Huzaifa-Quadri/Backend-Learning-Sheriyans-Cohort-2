/**
 * ============================================
 * Authentication Routes
 * ============================================
 * User registration, login, and token refresh
 * - POST /register - Create new user account
 * - POST /login - Authenticate user
 * - POST /refresh - Refresh JWT token
 */

import express from "express";
import { validateRegister, validateLogin } from "../middleware/validation.js";
import { verifyToken } from "../middleware/auth.js";
import { refresh, register, login, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * Register User
 * Route: POST /api/auth/register
 * Body: { name, email, password }
 *
 * Process:
 * 1. Validate input using validateRegister middleware
 * 2. Check if user already exists
 * 3. Create new user with hashed password
 * 4. Generate JWT token
 * 5. Return user data and token
 *
 * Response: { success, user, token }
 */
/**
 * @route - /api/auth/register
 * @description - Register a new user
 * @access - public
 */
router.post("/register", validateRegister, register);

/**
 * Login User
 * Route: POST /api/auth/login
 * Body: { email, password }
 *
 * Process:
 * 1. Validate input using validateLogin middleware
 * 2. Find user by email and select password field
 * 3. Compare entered password with stored hash
 * 4. Generate JWT token
 * 5. Update lastLogin timestamp
 * 6. Return user data and token
 *
 * Response: { success, user, token }
 */
/**
 * @route - /api/auth/login
 * @description - Login a user
 * @access - public
 */
router.post("/login", validateLogin, login);

/**
 * Refresh Token
 * Route: POST /api/auth/refresh
 * Headers: Authorization: Bearer <token>
 *
 * Process:
 * 1. Verify current JWT token (via verifyToken middleware)
 * 2. Generate new JWT token with same user data
 * 3. Return new token
 *
 * Response: { success, token }
 */
/**
 * @route - /api/auth/refresh
 * @description - Refresh JWT token
 * @access - private
 */
router.post("/refresh", verifyToken, refresh);

/**
 * Get Current User (Protected Route)
 * Route: GET /api/auth/me
 * Headers: Authorization: Bearer <token>
 *
 * Process:
 * 1. Verify JWT token (via verifyToken middleware)
 * 2. Fetch user details from database
 * 3. Return user profile data
 *
 * Response: { success, user }
 */
/**
 * @route - /api/auth/me
 * @description - Get current user
 * @access - private
 */
router.get("/me", verifyToken, getMe);

export default router;
