const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		mobile: {
			type: String,
			required: true,
			unique: true,
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
