const Vehicle = require("../models/Vehicle");

//Add a new vehicle

const createVehicle = async (req, res) => {
	try {
		const {
			vehicleNumber,
			model,
			capacity,
			name,
			purchaseDate,
			insuranceExpiry,
		} = req.body;
		const vehicle = await Vehicle.create({
			user: req.user._id,
			vehicleNumber,
			model,
			capacity,
			name,
			purchaseDate,
			insuranceExpiry,
		});
		res.status(201).json({ message: "Vehicle created successfully", vehicle });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating vehicle", error: error.message });
	}
};

const getVehicles = async (req, res) => {
	const userId = req.user._id;
	try {
		const vehicles = await Vehicle.find({ user: userId }).sort({
			createdAt: -1,
		});
		if (vehicles.length === 0) {
			return res
				.status(404)
				.json({ message: "No vehicle found for this user" });
		}
		res.status(200).json({ message: "Vehicle fetch successfully", vehicles });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching  vehicles", error: error.message });
	}
};

const getVehicleById = async (req, res) => {
	const userId = req.user._id;
	const vehicleId = req.params.id;
	try {
		const vehicle = await Vehicle.findOne({ _id: vehicleId, user: userId });
		if (!vehicle) {
			return res.status(404).json({ message: "Vehiclenot found." });
		}
		res.status(200).json({ message: "Vehicle fetched successfully", vehicle });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching vehicle", error: error.message });
	}
};

const updateVehicle = async (req, res) => {
	const userId = req.user._id;
	const vehicleId = req.params.id;
	const body = req.body;
	try {
		const updatedVehicle = await Vehicle.findOneAndUpdate(
			{ _id: vehicleId, user: userId },
			body,
			{ new: true, runValidators: true }
		);
		if (!updatedVehicle) {
			return res.status(404).json({ message: "Vehicle not found." });
		}
		res.json({ message: "Vehicle update successfully", updatedVehicle });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error update vehicle", error: error.message });
	}
};

const deleteVehicle = async (req, res) => {
	const userId = req.user._id;
	const vehicleId = req.params.id;
	try {
		const deleteVehicle = await Vehicle.findOneAndDelete({
			_id: vehicleId,
			user: userId,
		});
		if (!deleteVehicle) {
			return res.status(404).json({ message: "Vehicle not found." });
		}
		res
			.status(200)
			.json({ message: "Vehicle deleted successfully", deleteVehicle });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting vehicle", error: error.message });
	}
};

module.exports = {
	createVehicle,
	getVehicles,
	getVehicleById,
	updateVehicle,
	deleteVehicle,
};
