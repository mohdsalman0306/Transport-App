const express = require("express");
const router = express.Router();

const {
	createExpense,
	getExpenses,
	getExpenseById,
	updateExpense,
	deleteExpense,
} = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);

router.post("/", createExpense);
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
