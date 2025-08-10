const Expense = require("../models/Expense");
const mongoose = require("mongoose");

exports.getProfitReport = async (req, res) => {
	const userId = req.user._id;
	const { startDate, endDate, vehicleId, groupBy = "day" } = req.query;

	try {
		const match = { user: new mongoose.Types.ObjectId(userId) };

		if (vehicleId) {
			match.vehicle = new mongoose.Types.ObjectId(vehicleId);
		}

		if (startDate && endDate) {
			match.date = {
				$gte: new Date(startDate),
				$lte: new Date(endDate),
			};
		}

		const groupFormat =
			groupBy === "month"
				? { year: { $year: "$date" }, month: { $month: "$date" } }
				: {
						year: { $year: "$date" },
						month: { $month: "$date" },
						day: { $dayOfMonth: "$date" },
				  };

		const report = await Expense.aggregate([
			{ $match: match },
			{
				$group: {
					_id: {
						vehicle: "$vehicle",
						...groupFormat,
					},
					totalProfit: { $sum: "$profit" },
					totalSandBought: { $sum: "$sandBuyingPrice" },
					totalSandSold: { $sum: "$sandSellingPrice" },
					trips: { $sum: 1 },
				},
			},
			{
				$lookup: {
					from: "vehicles",
					localField: "_id.vehicle",
					foreignField: "_id",
					as: "vehicleDetails",
				},
			},
			{ $unwind: "$vehicleDetails" },
			{
				$project: {
					_id: 0,
					vehicle: "$vehicleDetails.vehicleNumber",
					model: "$vehicleDetails.model",
					date: "$_id",
					totalProfit: 1,
					totalSandBought: 1,
					totalSandSold: 1,
					trips: 1,
				},
			},
			{ $sort: { "date.year": -1, "date.month": -1, "date.day": -1 } },
		]);

		res.json(report);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Failed to generate report", error: err.message });
	}
};
