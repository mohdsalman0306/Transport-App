const mongoose = require("mongoose");
const driverSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		licenseNumber: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		contactNumber: {
			type: String,
			required: true,
			trim: true,
		},
		address: {
			type: String,
			trim: true,
		},
		licenseExpiry: {
			type: Date,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Driver", driverSchema);
