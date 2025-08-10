// controllers/authController.js
const User = require("../models/User"); // Mongoose User model (you must create this)
const jwt = require("jsonwebtoken"); // For generating a token (used in secure APIs)

// Helper function to generate JWT token with user ID
const generateAccessToken = (user) => {
	return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

const generateRefreshToken = (user) => {
	return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "30d",
	});
};

// Controller function for POST /api/auth/login
const loginWithMobile = async (req, res) => {
	const { mobile, otp } = req.body; // Extract mobile and otp from request body

	// Input validation
	if (!mobile || !otp) {
		return res.status(400).json({ message: "Mobile and OTP are required" });
	}

	if (otp.length !== 6) {
		return res.status(400).json({ message: "OTP must be 6 digits" });
	}

	if (otp !== "123456") {
		return res.status(403).json({ message: "Invalid OTP" }); // 403 = forbidden
	}

	try {
		// Find user by mobile or create new one
		let user = await User.findOne({ mobile });
		if (!user) {
			user = await User.create({ mobile }); // Create user if not exists
		}

		// Generate JWT token
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		// Save refresh token to user (optional, if you want to implement refresh token logic)
		user.refreshToken = refreshToken;
		await user.save();

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true, // Prevents client-side access to the cookie
			secure: true, //process.env.NODE_ENV === "production", // Use secure cookies in production
			sameSite: "Strict", // CSRF protection
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		});

		// Set token in response header (optional, if you want to use it in frontend)
		const token = accessToken; // Use access token for simplicity

		// Return user and token in response
		res.status(200).json({ _id: user._id, mobile: user.mobile, token });
	} catch (error) {
		console.error("Login failed", error); // Log internal error
		res.status(500).json({ message: "Internal server error" });
	}
};

const refreshAccesstoken = async (req, res) => {
	const { refreshToken } = req?.cookies; // Get refresh token from cookies
	if (!refreshToken) {
		return res.status(401).json({ message: "No refresh token provided" });
	}
	try {
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		const user = await User.findById(decoded.userId);
		if (!user || user.refreshToken !== refreshToken) {
			return res.status(403).json({ message: "Invalid refresh token" });
		}

		// Generate new access token
		const newAccessToken = generateAccessToken(user);
		res.status(200).json({ accessToken: newAccessToken });
	} catch (error) {
		res.status(403).json({ message: "Invalid or expired refresh token" });
	}
};

const logout = async (req, res) => {
	const { refreshToken } = req.cookies;
	if (!refreshToken) {
		return res.sendStatus(204); // No content
	}
	try {
		const user = await User.findOne({ refreshToken });
		if (user) {
			user.refreshToken = null;
			await user.save();
		}
		res.clearCookie("refreshToken");
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({ message: "Logout Error", error: error.message });
	}
};

module.exports = {
	loginWithMobile,
	generateAccessToken,
	generateRefreshToken,
	refreshAccesstoken,
	logout,
};
