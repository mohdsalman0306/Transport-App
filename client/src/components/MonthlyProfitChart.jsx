import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const MonthlyProfitChart = ({ data }) => {
	return (
		<div className="bg-white rounded shadow p-4">
			<h3 className="text-md font-semibold mb-4">
				Monthly Profit (Last 30 Days)
			</h3>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="profit"
						stroke="#34d399"
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MonthlyProfitChart;
