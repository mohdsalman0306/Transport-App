import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const MonthlySummaryChart = ({ data }) => {
	return (
		<div className="bg-white rounded shadow p-4">
			<h3 className="text-md font-semibold mb-4">Monthly Profit Summary</h3>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="profit"
						stroke="#10b981"
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MonthlySummaryChart;
