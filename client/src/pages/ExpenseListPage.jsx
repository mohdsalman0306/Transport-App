import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseFilterBar from "./expenses/ExpenseFilterBar"; // a filter UI
import ExpenseTable from "./expenses/ExpenseTable"; // the table component
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import { getExpenses } from "../services/ExpenseService";

const ExpenseListPage = () => {
	const [expenses, setExpenses] = useState([]);
	const [filters, setFilters] = useState({
		vehicle: "",
		driver: "",
		dateFrom: "",
		dateTo: "",
	});

	useEffect(() => {
		fetchExpenses();
	}, [filters]);

	const fetchExpenses = async () => {
		try {
			const data = await getExpenses();
			setExpenses(data);
		} catch (error) {
			console.error("Error fetching expenses:", error.message);
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">All Expenses</h2>
			<Link
				to="/expense/add"
				className="btn btn-primary flex items-center gap-2"
			>
				<FaPlus /> Add Expenses
			</Link>
			<ExpenseFilterBar filters={filters} setFilters={setFilters} />
			<ExpenseTable expenses={expenses} />
		</div>
	);
};

export default ExpenseListPage;
