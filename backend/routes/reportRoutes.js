const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProfitReport } = require("../controllers/reportController");

router.use(authMiddleware);

router.get("/profit", getProfitReport);

module.exports = router;
