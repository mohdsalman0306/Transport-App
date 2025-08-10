import { useEffect, useState } from "react";
import {
	getExpenseTypes,
	addExpenseType,
	deleteExpenseType,
} from "../services/expenseTypeService";
import { FaTrash, FaPlus } from "react-icons/fa";

const ExpenseTypeManagerPage = () => {
	const [types, setTypes] = useState([]);
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const loadTypes = async () => {
		const data = await getExpenseTypes();
		setTypes(data);
	};

	useEffect(() => {
		loadTypes();
	}, []);

	const handleAdd = async () => {
		if (!name.trim()) return;
		setLoading(true);
		await addExpenseType(name.trim());
		setName("");
		loadTypes();
		setLoading(false);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Delete this expense type?")) {
			await deleteExpenseType(id);
			loadTypes();
		}
	};

	return (
		<div className="max-w-xl mx-auto bg-white shadow rounded p-6 space-y-6">
			<h2 className="text-xl font-bold mb-4">Manage Expense Types</h2>

			<div className="flex items-center gap-2">
				<input
					type="text"
					placeholder="e.g. Fuel, Repair"
					className="input input-bordered flex-1"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button
					onClick={handleAdd}
					disabled={loading}
					className="btn btn-primary flex items-center gap-2"
				>
					<FaPlus /> Add
				</button>
			</div>

			<div>
				<ul className="divide-y">
					{types.map((type) => (
						<li
							key={type._id}
							className="flex justify-between items-center py-2"
						>
							<span>{type.name}</span>
							{!type.isDefault && (
								<button
									onClick={() => handleDelete(type._id)}
									className="text-red-500 hover:text-red-700"
								>
									<FaTrash />
								</button>
							)}
						</li>
					))}
				</ul>
				{types.length === 0 && (
					<p className="text-gray-500 mt-4 text-center">
						No expense types found.
					</p>
				)}
			</div>
		</div>
	);
};

export default ExpenseTypeManagerPage;
