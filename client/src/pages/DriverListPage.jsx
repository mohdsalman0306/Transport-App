import { useEffect, useState } from "react";
import { getDrivers, deleteDriver } from "../services/driverService";
import { Link } from "react-router";
import { FaUser, FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const DriverListPage = () => {
	const [drivers, setDrivers] = useState([]);
	const [search, setSearch] = useState("");

	const loadDrivers = async () => {
		const data = await getDrivers();
		setDrivers(data?.drivers);
	};

	useEffect(() => {
		loadDrivers();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm("Delete this driver?")) {
			await deleteDriver(id);
			loadDrivers();
		}
	};

	const filteredDrivers = drivers.filter((d) =>
		d.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center flex-wrap gap-4">
				<h2 className="text-xl font-semibold">Drivers</h2>
				<div className="flex gap-2">
					<input
						type="text"
						placeholder="Search driver..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="input input-bordered"
					/>
					<Link
						to="/drivers/add"
						className="btn btn-primary flex items-center gap-2"
					>
						<FaPlus /> Add Driver
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{filteredDrivers.map((driver) => (
					<div
						key={driver._id}
						className="bg-white rounded shadow p-4 flex items-center gap-4 hover:shadow-lg transition"
					>
						<div className="bg-blue-100 text-blue-600 p-3 rounded-full">
							<FaUser className="text-2xl" />
						</div>
						<div className="flex-1">
							<h4 className="text-lg font-semibold">{driver.name}</h4>
							<p className="text-sm text-gray-600">Phone: {driver.phone}</p>
							<p className="text-sm text-gray-600">
								License: {driver.licenseNumber}
							</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Link
								to={`/drivers/edit/${driver._id}`}
								className="text-blue-500 hover:underline"
							>
								<FaEdit />
							</Link>
							<button
								onClick={() => handleDelete(driver._id)}
								className="text-red-500 hover:underline"
							>
								<FaTrash />
							</button>
						</div>
					</div>
				))}

				{filteredDrivers.length === 0 && (
					<div className="col-span-full text-center text-gray-500">
						No drivers found.
					</div>
				)}
			</div>
		</div>
	);
};

export default DriverListPage;
