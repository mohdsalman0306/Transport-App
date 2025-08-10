// routes/authRoutes.js
const express = require("express"); // Import Express router
const router = express.Router(); // Create a new router instance

// Import controller function for handling login
const {
	loginWithMobile,
	refreshAccesstoken,
	logout,
} = require("../controllers/authController");

// Define POST /login route
router.post("/login", loginWithMobile); // Calls controller on /api/auth/login

router.get("/refresh", refreshAccesstoken); // Calls controller on /api/auth/refresh

router.post("/logout", logout); // Calls controller on /api/auth/logout

module.exports = router; // Export the router for use in server.js
