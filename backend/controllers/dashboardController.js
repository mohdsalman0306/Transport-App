const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Expense = require("../models/Expense");
const moment = require("moment"); // For date manipulation (Need to learn about it)

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
			createdAt: { $gte: startOfToday, $lte: endOfToday },
		});

		const thisMonthExpenses = await Expense.find({
			user: userId,
			createdAt: {
				$gte: moment().startOf("month").toDate(),
				$lte: moment().endOf("month").toDate(),
			},
		});

		const calculateProfit = (expenses) =>
			expenses.reduce((sum, exp) => {
				const profit =
					(exp.sandSellingPrice || 0) -
					((exp.sandBuyingPrice || 0) +
						(exp.royalty || 0) +
						(exp.toll || 0) +
						(exp.maintenance || 0) +
						(exp.driverFood || 0) +
						(exp.misc || 0));
				return sum + profit;
			}, 0);

		const todayProfit = calculateProfit(todayExpenses);
		const monthlyProfit = calculateProfit(thisMonthExpenses);

		res.json({
			totalVehicles,
			totalDrivers,
			todayProfit,
			monthlyProfit,
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
				createdAt: { $gte: start, $lte: end },
			});

			const profit = expenses.reduce((sum, exp) => {
				const p =
					(exp.sandSellingPrice || 0) -
					((exp.sandBuyingPrice || 0) +
						(exp.royalty || 0) +
						(exp.toll || 0) +
						(exp.maintenance || 0) +
						(exp.driverFood || 0) +
						(exp.misc || 0));
				return sum + p;
			}, 0);

			result.push({
				date: day.format("DD MMM"),
				profit: profit < 0 ? 0 : Math.round(profit),
			});
		}

		res.json(result);
	} catch (err) {
		console.error(err);
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
			createdAt: { $gte: start, $lte: end },
		});

		const breakdown = {
			royalty: 0,
			toll: 0,
			maintenance: 0,
			driverFood: 0,
			misc: 0,
		};

		expenses.forEach((exp) => {
			breakdown.royalty += exp.royalty || 0;
			breakdown.toll += exp.toll || 0;
			breakdown.maintenance += exp.maintenance || 0;
			breakdown.driverFood += exp.driverFood || 0;
			breakdown.misc += exp.misc || 0;
		});

		// Convert to array for chart
		const result = Object.entries(breakdown).map(([name, value]) => ({
			name,
			value: Math.round(value),
		}));

		res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch expense breakdown" });
	}
};

exports.getMonthlyProfit = async (req, res) => {
	try {
		const userId = req.user._id;
		const result = [];

		for (let i = 29; i >= 0; i--) {
			const day = moment().subtract(i, "days");
			const start = day.startOf("day").toDate();
			const end = day.endOf("day").toDate();

			const expenses = await Expense.find({
				user: userId,
				createdAt: { $gte: start, $lte: end },
			});

			const profit = expenses.reduce((sum, exp) => {
				const income = exp.sandSellingPrice || 0;
				const cost =
					(exp.sandBuyingPrice || 0) +
					(exp.royalty || 0) +
					(exp.toll || 0) +
					(exp.maintenance || 0) +
					(exp.driverFood || 0) +
					(exp.misc || 0);
				return sum + (income - cost);
			}, 0);

			result.push({
				date: day.format("DD MMM"),
				profit: Math.max(0, Math.round(profit)),
			});
		}

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch monthly profit" });
	}
};

exports.getMonthlyProfitSummary = async (req, res) => {
	try {
		const userId = req.user._id;
		const months = 6; // Last 6 months
		const result = [];

		for (let i = months - 1; i >= 0; i--) {
			const monthStart = moment()
				.subtract(i, "months")
				.startOf("month")
				.toDate();
			const monthEnd = moment().subtract(i, "months").endOf("month").toDate();

			const expenses = await Expense.find({
				user: userId,
				createdAt: { $gte: monthStart, $lte: monthEnd },
			});

			const profit = expenses.reduce((sum, exp) => {
				const income = exp.sandSellingPrice || 0;
				const cost =
					(exp.sandBuyingPrice || 0) +
					(exp.royalty || 0) +
					(exp.toll || 0) +
					(exp.maintenance || 0) +
					(exp.driverFood || 0) +
					(exp.misc || 0);
				return sum + (income - cost);
			}, 0);

			result.push({
				month: moment(monthStart).format("MMM YYYY"),
				profit: Math.max(0, Math.round(profit)),
			});
		}

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch monthly profit summary" });
	}
};
