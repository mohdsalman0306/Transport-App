import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	addVehicle,
	getVehicleById,
	updateVehicle,
} from "../services/vehicleService";

const VehicleFormPage = () => {
	const { id } = useParams();
	const isEdit = Boolean(id);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		model: "",
		vehicleNumber: "",
	});

	useEffect(() => {
		if (isEdit) {
			getVehicleById(id).then((data) => setForm(data?.vehicle));
		}
	}, [id]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isEdit) {
			await updateVehicle(id, form);
		} else {
			await addVehicle(form);
		}
		navigate("/vehicles");
	};

	return (
		<div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
			<h2 className="text-xl font-semibold mb-4">
				{isEdit ? "Edit Vehicle" : "Add Vehicle"}
			</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block">Name</label>
					<input
						name="name"
						value={form.name}
						onChange={handleChange}
						className="input"
						required
					/>
				</div>
				<div>
					<label className="block">Model</label>
					<input
						name="model"
						value={form.model}
						onChange={handleChange}
						className="input"
						required
					/>
				</div>
				<div>
					<label className="block">Vehicle Number</label>
					<input
						name="vehicleNumber"
						value={form.vehicleNumber}
						onChange={handleChange}
						className="input"
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary w-full">
					{isEdit ? "Update" : "Add"} Vehicle
				</button>
			</form>
		</div>
	);
};

export default VehicleFormPage;
