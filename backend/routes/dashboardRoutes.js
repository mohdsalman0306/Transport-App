const express = require("express");
const router = express.Router();
const {
	getDashboardSummary,
	getDailyProfit,
	getExpenseBreakdown,
	getMonthlyProfit,
	getMonthlyProfitSummary,
} = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/summary", authMiddleware, getDashboardSummary);
router.get("/daily-profit", authMiddleware, getDailyProfit);
router.get("/expense-breakdown", authMiddleware, getExpenseBreakdown);
router.get("/monthly-profit", authMiddleware, getMonthlyProfit);
router.get("/monthly-profit-summary", authMiddleware, getMonthlyProfitSummary);

module.exports = router;
