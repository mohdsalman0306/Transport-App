import React from "react";

const ExpenseFilterBar = ({ filters, setFilters }) => {
	const handleChange = (e) => {
		setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div className="bg-white p-4 rounded-md shadow-md mb-4 flex flex-wrap gap-4">
			<input
				type="date"
				name="dateFrom"
				value={filters.dateFrom}
				onChange={handleChange}
				className="input"
				placeholder="From Date"
			/>
			<input
				type="date"
				name="dateTo"
				value={filters.dateTo}
				onChange={handleChange}
				className="input"
				placeholder="To Date"
			/>
			<input
				type="text"
				name="vehicle"
				value={filters.vehicle}
				onChange={handleChange}
				className="input"
				placeholder="Vehicle Name / No"
			/>
			<input
				type="text"
				name="driver"
				value={filters.driver}
				onChange={handleChange}
				className="input"
				placeholder="Driver Name"
			/>
		</div>
	);
};
export default ExpenseFilterBar;
