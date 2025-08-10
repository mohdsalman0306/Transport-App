const ExpenseType = require("../models/ExpenseType");

// GET all types for user
exports.getExpenseTypes = async (req, res) => {
	try {
		const types = await ExpenseType.find({
			$or: [{ user: req.user._id }, { isDefault: true }],
		}).sort({ name: 1 });
		res.json(types);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Failed to fetch expense types", error: err.message });
	}
};

// POST add new type
exports.addExpenseType = async (req, res) => {
	try {
		const type = new ExpenseType({
			name: req.body.name,
			user: req.user._id,
		});
		await type.save();
		res.status(201).json(type);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Failed to add expense type", error: err.message });
	}
};

// DELETE a type
exports.deleteExpenseType = async (req, res) => {
	try {
		const { id } = req.params;
		await ExpenseType.deleteOne({ _id: id, user: req.user._id });
		res.json({ message: "Deleted successfully" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Failed to delete expense type", error: err.message });
	}
};
