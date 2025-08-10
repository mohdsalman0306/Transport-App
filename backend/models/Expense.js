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
		// Changed from individual fields to flexible expenseItems array
		expenseItems: [
			{
				expenseType: {
					type: String,
					required: true,
				},
				amount: {
					type: Number,
					required: true,
					default: 0,
				},
				description: {
					type: String,
					default: "",
				},
			},
		],
		profit: Number,
		remark: String,

		// Keep legacy fields for backward compatibility (optional)
		// You can remove these after data migration
		royalityFee: { type: Number, default: 0 },
		highwayToll: { type: Number, default: 0 },
		maintinance: { type: Number, default: 0 },
		driverFood: { type: Number, default: 0 },
		mics: Number,
	},
	{ timestamps: true }
);

expenseSchema.pre("save", function (next) {
	// Calculate total from expenseItems array
	const expenseItemsTotal = this.expenseItems.reduce((sum, item) => {
		return sum + (item.amount || 0);
	}, 0);

	const totalExpenses = expenseItemsTotal + (this.sandBuyingPrice || 0);
	this.profit = this.sandSellingPrice - totalExpenses;
	next();
});

module.exports = mongoose.model("Expense", expenseSchema);
