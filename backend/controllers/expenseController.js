const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
	try {
		console.log("Creating expense with data:", req);
		const expense = new Expense({
			...req.body,
			user: req.user._id,
		});
		await expense.save();
		res.status(201).json({ message: "Expense recorded successfully", expense });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to record expense", error: error.message });
	}
};

const getExpenses = async (req, res) => {
	const filter = { user: req.user._id };
	if (req.query.vehicleId) {
		filter.vehicle = req.query.vehicleId;
	}
	if (req.query.driverId) {
		filter.driver = req.query.driverId;
	}
	if (req.query.date) {
		filter.date = req.query.date;
	}
	try {
		const expenses = await Expense.find(filter)
			.sort({ date: -1 })
			.populate("vehicle")
			.populate("driver");
		res.status(200).json(expenses);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch expenses", error: error.message });
	}
};

const getExpenseById = async (req, res) => {
	try {
		const expense = await Expense.findOne({
			_id: req.params.id,
			user: req.user._id,
		})
			.populate("vehicle")
			.populate("driver");
		if (!expense) {
			return res.status(404).json({ message: "Expense not found." });
		}
		return res.status(200).json({
			message: "Expense fetched successfully",
			expense,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching expense", error: error.message });
	}
};

const updateExpense = async (req, res) => {
	try {
		const expense = await Expense.findOne({
			_id: req.params.id,
			user: req.user._id,
		});
		if (!expense) {
			return res.status(404).json({ message: "No Expense found" });
		}
		Object.assign(expense, req.body); //need to understand this line
		await expense.save();
		res.status(200).json({ message: "Expense updated successfully", expense });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to update expense", error: error.message });
	}
};

const deleteExpense = async (req, res) => {
	try {
		const expense = await Expense.findOneAndDelete({
			_id: req.params.id,
			user: req.user._id,
		});
		if (!expense) return res.status(404).json({ message: "Expense not found" });

		res.json({ message: "Expense deleted" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Failed to delete expense", error: err.message });
	}
};

module.exports = {
	createExpense,
	getExpenses,
	getExpenseById,
	updateExpense,
	deleteExpense,
};
