const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");

// Login
router.post("/auth/login", authControllers.login);

// Forgot Password
router.post(
  "/auth/forgot-password",
  authControllers.forgotPassword
);

// Refresh access token
router.post(
  "/auth/refresh",
  authControllers.refreshAccessToken
);

// Get current logged-in user
router.get(
  "/auth/me",
  authMiddleware,
  authControllers.getMe
);

router.post("/auth/logout", authControllers.logout);

module.exports = router;