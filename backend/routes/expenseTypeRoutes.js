const express = require("express");
const router = express.Router();

const {
	getExpenseTypes,
	addExpenseType,
	deleteExpenseType,
} = require("../controllers/expenseTypeController");

const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);

router.get("/", getExpenseTypes);
router.post("/", addExpenseType);
router.delete("/:id", deleteExpenseType);

module.exports = router;
