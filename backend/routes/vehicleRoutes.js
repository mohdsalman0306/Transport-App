const express = require("express");
const router = express.Router();

const { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle } = require("../controllers/vehicleController");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);

// Define POST /vehicles route for creating a new vehicle
router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);


module.exports = router;
