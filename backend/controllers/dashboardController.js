const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Expense = require("../models/Expense");
const moment = require("moment");

// Helper function to calculate profit from expense with new structure
const calculateExpenseProfit = (expense) => {
	const income = expense.sandSellingPrice || 0;
	const sandBuyingCost = expense.sandBuyingPrice || 0;

	// Calculate total from expenseItems array
	let expenseItemsTotal = 0;
	if (expense.expenseItems && expense.expenseItems.length > 0) {
		expenseItemsTotal = expense.expenseItems.reduce((sum, item) => {
			return sum + (item.amount || 0);
		}, 0);
	} else {
		// Fallback to legacy fields for backward compatibility
		expenseItemsTotal =
			(expense.royalityFee || 0) +
			(expense.highwayToll || 0) +
			(expense.maintinance || 0) +
			(expense.driverFood || 0) +
			(expense.mics || 0);
	}

	const totalCost = sandBuyingCost + expenseItemsTotal;
	return income - totalCost;
};

// Helper function to calculate total profits from expenses array
const calculateTotalProfit = (expenses) => {
	return expenses.reduce((sum, expense) => {
		return sum + calculateExpenseProfit(expense);
	}, 0);
};

exports.getDashboardSummary = async (req, res) => {
	try {
		const userId = req.user._id;

		const [totalVehicles, totalDrivers] = await Promise.all([
			Vehicle.countDocuments({ user: userId }),
			Driver.countDocuments({ user: userId }),
		]);

		const startOfToday = moment().startOf("day").toDate();
		const endOfToday = moment().endOf("day").toDate();

		const todayExpenses = await Expense.find({
			user: userId,
			date: { $gte: startOfToday, $lte: endOfToday },
		});

		const thisMonthExpenses = await Expense.find({
			user: userId,
			date: {
				$gte: moment().startOf("month").toDate(),
				$lte: moment().endOf("month").toDate(),
			},
		});

		const todayProfit = calculateTotalProfit(todayExpenses);
		const monthlyProfit = calculateTotalProfit(thisMonthExpenses);

		res.json({
			totalVehicles,
			totalDrivers,
			todayProfit: Math.round(todayProfit),
			monthlyProfit: Math.round(monthlyProfit),
		});
	} catch (error) {
		console.error("Dashboard summary error:", error.message);
		res.status(500).json({ message: "Failed to fetch summary" });
	}
};

exports.getDailyProfit = async (req, res) => {
	try {
		const userId = req.user._id;
		const days = 7;
		const result = [];

		for (let i = days - 1; i >= 0; i--) {
			const day = moment().subtract(i, "days");
			const start = day.startOf("day").toDate();
			const end = day.endOf("day").toDate();

			const expenses = await Expense.find({
				user: userId,
				date: { $gte: start, $lte: end },
			});

			const profit = calculateTotalProfit(expenses);

			result.push({
				date: day.format("DD MMM"),
				profit: Math.max(0, Math.round(profit)), // Don't show negative profits
			});
		}

		res.json(result);
	} catch (err) {
		console.error("Daily profit error:", err);
		res.status(500).json({ message: "Error generating daily profit" });
	}
};

exports.getExpenseBreakdown = async (req, res) => {
	try {
		const userId = req.user._id;
		const start = moment().startOf("day").toDate();
		const end = moment().endOf("day").toDate();

		const expenses = await Expense.find({
			user: userId,
			date: { $gte: start, $lte: end },
		});

		// Aggregate expenses by type from expenseItems
		const breakdown = {};

		expenses.forEach((expense) => {
			if (expense.expenseItems && expense.expenseItems.length > 0) {
				// Use new structure
				expense.expenseItems.forEach((item) => {
					const expenseType = item.expenseType;
					if (expenseType) {
						breakdown[expenseType] =
							(breakdown[expenseType] || 0) + (item.amount || 0);
					}
				});
			} else {
				// Fallback to legacy fields for backward compatibility
				if (expense.royalityFee)
					breakdown["Royality Fee"] =
						(breakdown["Royality Fee"] || 0) + expense.royalityFee;
				if (expense.highwayToll)
					breakdown["Highway Toll"] =
						(breakdown["Highway Toll"] || 0) + expense.highwayToll;
				if (expense.maintinance)
					breakdown["Maintinance"] =
						(breakdown["Maintinance"] || 0) + expense.maintinance;
				if (expense.driverFood)
					breakdown["Driver Food"] =
						(breakdown["Driver Food"] || 0) + expense.driverFood;
				if (expense.mics)
					breakdown["Mics"] = (breakdown["Mics"] || 0) + expense.mics;
			}
		});

		// Convert to array for chart and sort by value (descending)
		const result = Object.entries(breakdown)
			.map(([name, value]) => ({
				name,
				value: Math.round(value),
			}))
			.sort((a, b) => b.value - a.value) // Sort by highest expense first
			.filter((item) => item.value > 0); // Only include expenses with value

		res.json(result);
	} catch (error) {
		console.error("Expense breakdown error:", error);
		res.status(500).json({ message: "Failed to fetch expense breakdown" });
	}
};

exports.getMonthlyProfit = async (req, res) => {
	try {
		const userId = req.user._id;
		const days = parseInt(req.query.days) || 30; // Allow customizable days, default 30
		const result = [];

		for (let i = days - 1; i >= 0; i--) {
			const day = moment().subtract(i, "days");
			const start = day.startOf("day").toDate();
			const end = day.endOf("day").toDate();

			const expenses = await Expense.find({
				user: userId,
				date: { $gte: start, $lte: end },
			});

			const profit = calculateTotalProfit(expenses);

			result.push({
				date: day.format("DD MMM"),
				profit: Math.max(0, Math.round(profit)),
			});
		}

		res.json(result);
	} catch (err) {
		console.error("Monthly profit error:", err);
		res.status(500).json({ message: "Failed to fetch monthly profit" });
	}
};

exports.getMonthlyProfitSummary = async (req, res) => {
	try {
		const userId = req.user._id;
		const months = parseInt(req.query.months) || 6; // Allow customizable months, default 6
		const result = [];

		for (let i = months - 1; i >= 0; i--) {
			const monthStart = moment()
				.subtract(i, "months")
				.startOf("month")
				.toDate();
			const monthEnd = moment().subtract(i, "months").endOf("month").toDate();

			const expenses = await Expense.find({
				user: userId,
				date: { $gte: monthStart, $lte: monthEnd },
			});

			const profit = calculateTotalProfit(expenses);

			result.push({
				month: moment(monthStart).format("MMM YYYY"),
				profit: Math.max(0, Math.round(profit)),
			});
		}

		res.json(result);
	} catch (err) {
		console.error("Monthly profit summary error:", err);
		res.status(500).json({ message: "Failed to fetch monthly profit summary" });
	}
};

// Additional endpoint to get expense types breakdown (useful for analytics)
exports.getExpenseTypesSummary = async (req, res) => {
	try {
		const userId = req.user._id;
		const period = req.query.period || "month"; // 'today', 'week', 'month', 'year'

		let startDate, endDate;

		switch (period) {
			case "today":
				startDate = moment().startOf("day").toDate();
				endDate = moment().endOf("day").toDate();
				break;
			case "week":
				startDate = moment().startOf("week").toDate();
				endDate = moment().endOf("week").toDate();
				break;
			case "year":
				startDate = moment().startOf("year").toDate();
				endDate = moment().endOf("year").toDate();
				break;
			case "month":
			default:
				startDate = moment().startOf("month").toDate();
				endDate = moment().endOf("month").toDate();
		}

		const expenses = await Expense.find({
			user: userId,
			date: { $gte: startDate, $lte: endDate },
		});

		const summary = {
			totalExpenses: 0,
			totalRevenue: 0,
			totalProfit: 0,
			expenseTypes: {},
			expenseCount: expenses.length,
		};

		expenses.forEach((expense) => {
			const revenue = expense.sandSellingPrice || 0;
			const sandCost = expense.sandBuyingPrice || 0;

			summary.totalRevenue += revenue;
			summary.totalExpenses += sandCost;

			if (expense.expenseItems && expense.expenseItems.length > 0) {
				expense.expenseItems.forEach((item) => {
					const expenseType = item.expenseType;
					const amount = item.amount || 0;

					if (expenseType) {
						summary.expenseTypes[expenseType] =
							(summary.expenseTypes[expenseType] || 0) + amount;
						summary.totalExpenses += amount;
					}
				});
			} else {
				// Fallback to legacy fields
				const legacyFields = [
					{ key: "royalityFee", name: "Royality Fee" },
					{ key: "highwayToll", name: "Highway Toll" },
					{ key: "maintinance", name: "Maintinance" },
					{ key: "driverFood", name: "Driver Food" },
					{ key: "mics", name: "Mics" },
				];

				legacyFields.forEach(({ key, name }) => {
					const amount = expense[key] || 0;
					if (amount > 0) {
						summary.expenseTypes[name] =
							(summary.expenseTypes[name] || 0) + amount;
						summary.totalExpenses += amount;
					}
				});
			}
		});

		summary.totalProfit = summary.totalRevenue - summary.totalExpenses;

		// Convert expenseTypes object to array and sort by amount
		summary.expenseTypesArray = Object.entries(summary.expenseTypes)
			.map(([name, value]) => ({ name, value: Math.round(value) }))
			.sort((a, b) => b.value - a.value);

		res.json(summary);
	} catch (error) {
		console.error("Expense types summary error:", error);
		res.status(500).json({ message: "Failed to fetch expense types summary" });
	}
};

module.exports = exports;
