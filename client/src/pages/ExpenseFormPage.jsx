import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getExpenseById,
	addExpense,
	updateExpense,
} from "../services/ExpenseService";
import { getExpenseTypes } from "../services/ExpenseTypeService";
import { getVehicles } from "../services/vehicleService";
import { getDrivers } from "../services/driverService";
import { toast } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";

const ExpenseFormPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const isEdit = Boolean(id);

	const [vehicles, setVehicles] = useState([]);
	const [drivers, setDrivers] = useState([]);
	const [expenseTypes, setExpenseTypes] = useState([]);

	const [formData, setFormData] = useState({
		vehicle: "",
		driver: "",
		date: "",
		sandBuyingPrice: "",
		sandSellingPrice: "",
		remark: "",
	});

	const [rows, setRows] = useState([
		{ expenseType: "", amount: "", description: "" },
	]);

	// Fetch dropdown data
	useEffect(() => {
		(async () => {
			try {
				const types = await getExpenseTypes();
				setExpenseTypes(types);
				const vData = await getVehicles();
				setVehicles(vData);
				const dData = await getDrivers();
				setDrivers(dData);
			} catch (err) {
				toast.error("Failed to load dropdown data");
			}
		})();
	}, []);

	// Load for edit
	useEffect(() => {
		if (isEdit) {
			(async () => {
				try {
					const data = await getExpenseById(id);
					const expense = data?.expense;

					setFormData({
						vehicle: expense?.vehicle?._id || "",
						driver: expense?.driver?._id || "",
						date: expense?.date?.split("T")[0] || "",
						sandBuyingPrice: expense?.sandBuyingPrice || "",
						sandSellingPrice: expense?.sandSellingPrice || "",
						remark: expense?.remark || "",
					});

					// Load expenseItems directly from the new structure
					if (expense?.expenseItems && expense.expenseItems.length > 0) {
						setRows(
							expense.expenseItems.map((item) => ({
								expenseType: item.expenseType || "",
								amount: item.amount || "",
								description: item.description || "",
							}))
						);
					} else {
						// Fallback: Load from legacy fields for backward compatibility
						const dynamicItems = [];
						if (expense?.royalityFee) {
							dynamicItems.push({
								expenseType: "Royality Fee",
								amount: expense.royalityFee,
								description: "",
							});
						}
						if (expense?.highwayToll) {
							dynamicItems.push({
								expenseType: "Highway Toll",
								amount: expense.highwayToll,
								description: "",
							});
						}
						if (expense?.maintinance) {
							dynamicItems.push({
								expenseType: "Maintinance",
								amount: expense.maintinance,
								description: "",
							});
						}
						if (expense?.driverFood) {
							dynamicItems.push({
								expenseType: "Driver Food",
								amount: expense.driverFood,
								description: "",
							});
						}
						if (expense?.mics) {
							dynamicItems.push({
								expenseType: "Mics",
								amount: expense.mics,
								description: "",
							});
						}

						setRows(
							dynamicItems.length > 0
								? dynamicItems
								: [{ expenseType: "", amount: "", description: "" }]
						);
					}
				} catch (err) {
					console.error("Error loading expense:", err);
					toast.error("Failed to load expense");
				}
			})();
		}
	}, [id, isEdit]);

	// Handlers
	const handleFormChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleRowChange = (index, field, value) => {
		const updated = [...rows];
		updated[index][field] = value;
		setRows(updated);
	};

	const addRow = () => {
		setRows([...rows, { expenseType: "", amount: "", description: "" }]);
	};

	const removeRow = (index) => {
		if (rows.length > 1) {
			setRows(rows.filter((_, i) => i !== index));
		}
	};

	// Calculations
	const totalExpense = useMemo(() => {
		const dynamicTotal = rows.reduce(
			(sum, row) => sum + Number(row.amount || 0),
			0
		);
		return dynamicTotal + Number(formData.sandBuyingPrice || 0);
	}, [rows, formData.sandBuyingPrice]);

	const netProfit = useMemo(() => {
		return Number(formData.sandSellingPrice || 0) - totalExpense;
	}, [formData.sandSellingPrice, totalExpense]);

	// Validate and clean expense items
	const getValidExpenseItems = () => {
		return rows
			.filter(
				(row) =>
					row.expenseType &&
					row.expenseType.trim() !== "" &&
					row.amount !== "" &&
					row.amount !== null &&
					row.amount !== undefined
			)
			.map((row) => ({
				expenseType: row.expenseType.trim(),
				amount: Number(row.amount || 0),
				description: row.description?.trim() || "",
			}));
	};

	// Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate required fields
		if (
			!formData.vehicle ||
			!formData.date ||
			!formData.sandBuyingPrice ||
			!formData.sandSellingPrice
		) {
			toast.error("Please fill all required fields");
			return;
		}

		const validExpenseItems = getValidExpenseItems();

		if (validExpenseItems.length === 0) {
			toast.error("Please add at least one valid expense item");
			return;
		}

		const payload = {
			vehicle: formData.vehicle,
			driver: formData.driver || undefined, // Don't send empty string
			date: formData.date,
			sandBuyingPrice: Number(formData.sandBuyingPrice),
			sandSellingPrice: Number(formData.sandSellingPrice),
			expenseItems: validExpenseItems,
			profit: netProfit,
			remark: formData.remark?.trim() || "",
		};

		try {
			if (isEdit) {
				await updateExpense(id, payload);
				toast.success("Expense updated successfully");
			} else {
				await addExpense(payload);
				toast.success("Expense added successfully");
			}
			navigate("/expenses");
		} catch (err) {
			console.error("Error submitting expense:", err);
			toast.error(err.message || "Something went wrong");
		}
	};

	return (
		<div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl p-8">
			<h2 className="text-3xl font-bold mb-8 text-gray-800">
				{isEdit ? "Edit Expense" : "Add New Expense"}
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Top Form Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Vehicle */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-1">
							Vehicle *
						</label>
						<select
							value={formData.vehicle}
							onChange={(e) => handleFormChange("vehicle", e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
							required
						>
							<option value="">Select Vehicle</option>
							{vehicles?.vehicles?.map((v) => (
								<option key={v._id} value={v._id}>
									{v.name}
								</option>
							))}
						</select>
					</div>

					{/* Driver */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-1">
							Driver
						</label>
						<select
							value={formData.driver}
							onChange={(e) => handleFormChange("driver", e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
						>
							<option value="">Select Driver</option>
							{drivers?.drivers?.map((d) => (
								<option key={d._id} value={d._id}>
									{d.name}
								</option>
							))}
						</select>
					</div>

					{/* Date */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-1">
							Date *
						</label>
						<input
							type="date"
							value={formData.date}
							onChange={(e) => handleFormChange("date", e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Sand Buying Price */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-1">
							Sand Buying Price *
						</label>
						<input
							type="number"
							min="0"
							step="0.01"
							value={formData.sandBuyingPrice || ""}
							onChange={(e) =>
								handleFormChange("sandBuyingPrice", e.target.value)
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Sand Selling Price */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-1">
							Sand Selling Price *
						</label>
						<input
							type="number"
							min="0"
							step="0.01"
							value={formData.sandSellingPrice || ""}
							onChange={(e) =>
								handleFormChange("sandSellingPrice", e.target.value)
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Remark */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-1">
							Remark
						</label>
						<input
							type="text"
							value={formData.remark || ""}
							onChange={(e) => handleFormChange("remark", e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
							placeholder="Optional remarks"
						/>
					</div>
				</div>

				{/* Dynamic Rows */}
				<div>
					<label className="block text-lg font-semibold text-gray-800 mb-4">
						Expense Items *
					</label>
					{rows.map((row, index) => (
						<div
							key={index}
							className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
						>
							<div>
								<select
									value={row.expenseType}
									onChange={(e) =>
										handleRowChange(index, "expenseType", e.target.value)
									}
									className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
									required
								>
									<option value="">Select Type</option>
									{expenseTypes.map((type) => (
										<option key={type._id} value={type.name}>
											{type.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<input
									type="number"
									min="0"
									step="0.01"
									placeholder="Amount"
									value={row.amount}
									onChange={(e) =>
										handleRowChange(index, "amount", e.target.value)
									}
									className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
									required
								/>
							</div>

							<div>
								<input
									type="text"
									placeholder="Description (optional)"
									value={row.description}
									onChange={(e) =>
										handleRowChange(index, "description", e.target.value)
									}
									className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
								/>
							</div>

							<div className="flex gap-2 col-span-1 md:col-span-2">
								{rows.length > 1 && (
									<button
										type="button"
										onClick={() => removeRow(index)}
										className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
										title="Remove row"
									>
										<FaTrash />
									</button>
								)}
								{index === rows.length - 1 && (
									<button
										type="button"
										onClick={addRow}
										className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
										title="Add new row"
									>
										<FaPlus />
									</button>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Summary */}
				<div className="bg-blue-100 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="text-lg font-semibold text-gray-700">
						Total Expense:{" "}
						<span className="text-red-600">₹ {totalExpense.toFixed(2)}</span>
					</div>
					<div className="text-lg font-semibold text-gray-700">
						Net Profit:{" "}
						<span
							className={`${
								netProfit >= 0 ? "text-green-600" : "text-red-600"
							}`}
						>
							₹ {netProfit.toFixed(2)}
						</span>
					</div>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]"
				>
					{isEdit ? "Update Expense" : "Save Expense"}
				</button>
			</form>
		</div>
	);
};

export default ExpenseFormPage;
