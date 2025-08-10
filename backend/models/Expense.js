const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		vehicle: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Vehicle",
			required: true,
		},
		driver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Driver",
			required: false,
		},
		date: {
			type: Date,
			required: true,
		},
		sandBuyingPrice: {
			type: Number,
			required: true,
		},
		sandSellingPrice: {
			type: Number,
			required: true,
		},
		royalityFee: { type: Number, default: 0 },
		highwayToll: { type: Number, default: 0 },
		maintinance: { type: Number, default: 0 },
		driverFood: { type: Number, default: 0 },
		mics: Number,
		profit: Number,
		remark: String,
	},
	{ timestamps: true }
);

expenseSchema.pre("save", function (next) {
	const totalExpenses =
		(this.royalityFee || 0) +
		(this.highwayToll || 0) +
		(this.maintinance || 0) +
		(this.driverFood || 0) +
		(this.misc || 0) +
		(this.sandBuyingPrice || 0);
	this.profit = this.sandSellingPrice - totalExpenses;
	next();
});

module.exports = mongoose.model("Expense", expenseSchema);
