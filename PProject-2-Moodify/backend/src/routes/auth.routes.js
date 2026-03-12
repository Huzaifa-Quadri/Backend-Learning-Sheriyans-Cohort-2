// const express = require("express");
// const authRouter = express.Router();

const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = Router();

/**
 * @route - POST/api/auth/register
 * @description - Register a new user
 * @access - public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route - POST/api/auth/login
 * @description - Login a existing user
 * @access - public
 */

authRouter.post("/login", authController.loginUserController);

authRouter.get("/get-me", authMiddleware, authController.getMeController);

authRouter.post("/logout", authMiddleware, authController.logoutController);

module.exports = authRouter;
