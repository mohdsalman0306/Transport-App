import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import { FaTruck, FaUserTie, FaMoneyBill, FaChartLine } from "react-icons/fa";
import {
	getDailyProfit,
	getDashboardSummary,
	getExpenseBreakdown,
	getMonthlyProfit,
	getMonthlyProfitSummary,
} from "../services/dashboardService";
import DailyProfitChart from "../components/DailyProfitChart";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyProfitChart from "../components/MonthlyProfitChart";
import MonthlySummaryChart from "../components/MonthlySummaryChart";

const DashboardPage = () => {
	const [summary, setSummary] = useState(null);
	const [dailyData, setDailyData] = useState([]);
	const [expenseBreakdown, setExpenseBreakdown] = useState([]);
	const [monthlyProfitData, setMonthlyProfitData] = useState([]);
	const [monthlySummaryData, setMonthlySummaryData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const summary = await getDashboardSummary();
			const daily = await getDailyProfit();
			const breakdown = await getExpenseBreakdown();
			const monthly = await getMonthlyProfit();
			const monthlySummary = await getMonthlyProfitSummary();

			setSummary(summary);
			setDailyData(daily);
			setExpenseBreakdown(breakdown);
			setMonthlyProfitData(monthly);
			setMonthlySummaryData(monthlySummary);
		};

		fetchData();
	}, []);

	if (!summary) {
		return <p>Loading summary...</p>;
	}

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold">Dashboard</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<SummaryCard
					title="Total Vehicles"
					value={summary.totalVehicles}
					icon={<FaTruck />}
					color="bg-blue-100"
					textColor="text-blue-700"
				/>
				<SummaryCard
					title="Total Drivers"
					value={summary.totalDrivers}
					icon={<FaUserTie />}
					color="bg-green-100"
					textColor="text-green-700"
				/>
				<SummaryCard
					title="Today’s Profit"
					value={`AED ${summary.todayProfit}`}
					icon={<FaMoneyBill />}
					color="bg-yellow-100"
					textColor="text-yellow-700"
				/>
				<SummaryCard
					title="Monthly Profit"
					value={`AED ${summary.monthlyProfit}`}
					icon={<FaChartLine />}
					color="bg-purple-100"
					textColor="text-purple-700"
				/>
			</div>
			<div className="mt-6">
				<DailyProfitChart data={dailyData} />
			</div>
			<div className="mt-6">
				<ExpensePieChart data={expenseBreakdown} />
			</div>
			<div className="mt-6">
				<MonthlySummaryChart data={monthlySummaryData} />
			</div>
			<div className="mt-6">
				<MonthlyProfitChart data={monthlyProfitData} />
			</div>
		</div>
	);
};

export default DashboardPage;
