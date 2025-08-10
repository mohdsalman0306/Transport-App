import { useEffect, useState } from "react";
import { getVehicles, deleteVehicle } from "../services/vehicleService";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const VehicleListPage = () => {
	const [vehicles, setVehicles] = useState([]);

	const loadVehicles = async () => {
		const data = await getVehicles();
		setVehicles(data);
	};

	console.log("Vehicles loaded:", vehicles);

	useEffect(() => {
		loadVehicles();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm("Delete this vehicle?")) {
			await deleteVehicle(id);
			loadVehicles();
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">Vehicles</h2>
				<Link
					to="/vehicles/add"
					className="btn btn-primary flex items-center gap-2"
				>
					<FaPlus /> Add Vehicle
				</Link>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full table-auto border">
					<thead className="bg-gray-100 text-left">
						<tr>
							<th className="p-2">Name</th>
							<th className="p-2">Model</th>
							<th className="p-2">Vehicle Number</th>
							<th className="p-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{vehicles?.vehicles?.length > 0 &&
							vehicles?.vehicles.map((v) => (
								<tr key={v._id} className="border-t">
									<td className="p-2">{v.name}</td>
									<td className="p-2">{v.model}</td>
									<td className="p-2">{v.vehicleNumber}</td>
									<td className="p-2 flex gap-2">
										<Link
											to={`/vehicles/edit/${v._id}`}
											className="text-blue-600"
										>
											<FaEdit />
										</Link>
										<button
											onClick={() => handleDelete(v._id)}
											className="text-red-600"
										>
											<FaTrash />
										</button>
									</td>
								</tr>
							))}
						{vehicles.length === 0 && (
							<tr>
								<td className="p-2" colSpan={4}>
									No vehicles found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default VehicleListPage;
