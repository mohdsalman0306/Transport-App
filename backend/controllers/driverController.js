const Driver = require("../models/Driver");

const createDriver = async (req, res) => {
	try {
		const userId = req.user._id;
		const driver = await Driver.create({
			user: userId,
			...req.body,
		});
		res.status(201).json({ message: "Driver created successfully", driver });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating driver", error: error.message });
	}
};

const getDrivers = async (req, res) => {
	const userId = req.user._id;
	try {
		const drivers = await Driver.find({ user: userId }).sort({ createdAt: -1 });
		if (drivers.length === 0) {
			return res
				.status(404)
				.json({ message: "No drivers found for this user" });
		}
		return res
			.status(200)
			.json({ message: "Drivers fetched successfully", drivers });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching drivers", error: error.message });
	}
};

const getDriverById = async (req, res) => {
	const userId = req.user._id;
	try {
		const driverId = req.params.id;
		const driver = await Driver.findOne({ _id: driverId, user: userId });
		if (!driver) {
			return res.status(404).json({ message: "Driver not found." });
		}
		return res.status(200).json({
			message: "Driver fetched successfully",
			driver,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching driver", error: error.message });
	}
};

const updateDriver = async (req, res) => {
	const userId = req.user._id;
	const driverId = req.params.id;
	const body = req.body;
	try {
		const updatedDriver = await Driver.findOneAndUpdate(
			{ _id: driverId, user: userId },
			body,
			{ new: true, runValidators: true }
		);
		if (!updatedDriver) {
			return res.status(404).json({ message: "Driver not found!" });
		}
		return res
			.status(200)
			.json({ message: "Driver updated successfully", updatedDriver });
	} catch (error) {
		return res.status(500).json({
			message: "Error updating updating driver",
			error: error.message,
		});
	}
};

const deleteDriver = async (req, res) => {
	const userId = req.user._id;
	const driverId = req.params.id;
	try {
		await Driver.findOneAndDelete({
			_id: driverId,
			user: userId,
		});
		res.status(200).json({
			message: "Driver deleted successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Error deleting driver",
		});
	}
};

module.exports = {
	createDriver,
	getDrivers,
	getDriverById,
	updateDriver,
	deleteDriver,
};
