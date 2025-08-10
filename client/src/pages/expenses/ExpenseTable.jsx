import React from "react";
import { Link } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";

const ExpenseTable = ({ expenses }) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white shadow rounded-md overflow-hidden">
				<thead>
					<tr className="bg-gray-100 text-gray-700 text-left">
						<th className="p-2">Date</th>
						<th className="p-2">Vehicle</th>
						<th className="p-2">Driver</th>
						<th className="p-2">Profit</th>
						<th className="p-2">Action</th>
					</tr>
				</thead>
				<tbody>
					{expenses?.length === 0 && (
						<tr>
							<td colSpan="5" className="text-center p-4">
								No expenses found.
							</td>
						</tr>
					)}
					{expenses.map((exp) => (
						<tr key={exp._id} className="border-t">
							<td className="p-2">{new Date(exp.date).toLocaleDateString()}</td>
							<td className="p-2">{exp.vehicle?.name || "-"}</td>
							<td className="p-2">{exp.driver?.name || "-"}</td>
							<td className="p-2">{exp.profit?.toFixed(2)}</td>
							<td className="p-2 text-right">
								<Link
									to={`/expense/edit/${exp._id}`}
									className="btn btn-primary flex items-center gap-2"
								>
									<FaEdit className="text-blue-600" />
								</Link>
								<Link
									to="/expense/add"
									className="btn btn-primary flex items-center gap-2"
								>
									<FaTrash className="text-red-600" />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ExpenseTable;
