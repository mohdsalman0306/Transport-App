const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		vehicleNumber: {
			type: String,
			required: true,
			unique: true,
		},
		model: {
			type: String,
			required: true,
		},
		capacity: String,
		name: String,
		purchaseDate: Date,
		insuranceExpiry: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
