import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	addDriver,
	getDriverById,
	updateDriver,
} from "../services/driverService";
import { FaUserTie } from "react-icons/fa";

const DriverFormPage = () => {
	const { id } = useParams();
	const isEdit = Boolean(id);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		contactNumber: "",
		licenseNumber: "",
		address: "",
		licenseExpiry: "",
		isActive: true,
	});

	useEffect(() => {
		if (isEdit) {
			getDriverById(id).then((data) =>
				setForm({
					...data?.driver,
					licenseExpiry: data?.driver.licenseExpiry
						? data?.driver.licenseExpiry.split("T")[0]
						: "",
				})
			);
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isEdit) {
			await updateDriver(id, form);
		} else {
			await addDriver(form);
		}
		navigate("/drivers");
	};

	return (
		<div className="max-w-xl mx-auto">
			<div className="bg-white shadow-lg rounded-lg p-6">
				<div className="flex items-center mb-6">
					<div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
						<FaUserTie className="text-3xl" />
					</div>
					<h2 className="text-2xl font-semibold">
						{isEdit ? "Edit Driver" : "Add New Driver"}
					</h2>
				</div>

				<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
					<div>
						<label className="block text-sm font-medium mb-1">Name</label>
						<input
							name="name"
							value={form.name}
							onChange={handleChange}
							required
							placeholder="e.g. Ahmed Khan"
							className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Phone</label>
						<input
							name="contactNumber"
							value={form.contactNumber}
							onChange={handleChange}
							required
							placeholder="e.g. +971 50 123 4567"
							className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							License Number
						</label>
						<input
							name="licenseNumber"
							value={form.licenseNumber}
							onChange={handleChange}
							required
							placeholder="e.g. DRV-567891"
							className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							License Expiry
						</label>
						<input
							type="date"
							name="licenseExpiry"
							value={form.licenseExpiry}
							onChange={handleChange}
							required
							className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Address (optional)
						</label>
						<textarea
							name="address"
							value={form.address}
							onChange={handleChange}
							rows={3}
							placeholder="e.g. Al Ain, Abu Dhabi"
							className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>

					<div className="flex items-center gap-3">
						<input
							type="checkbox"
							name="isActive"
							checked={form.isActive}
							onChange={handleChange}
							className="w-5 h-5"
						/>
						<label className="text-sm font-medium">Mark as Active</label>
					</div>

					<button
						type="submit"
						className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
					>
						{isEdit ? "Update Driver" : "Add Driver"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default DriverFormPage;
