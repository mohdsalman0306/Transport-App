import api from "./api";

export const getDashboardSummary = async () => {
	const res = await api.get("/dashboard/summary");
	return res.data;
};

export const getDailyProfit = async () => {
	const res = await api.get("/dashboard/daily-profit");
	return res.data;
};

export const getExpenseBreakdown = async () => {
	const res = await api.get("/dashboard/expense-breakdown");
	return res.data;
};

export const getMonthlyProfit = async () => {
	const res = await api.get("/dashboard/monthly-profit");
	return res.data;
};

export const getMonthlyProfitSummary = async () => {
	const res = await api.get("/dashboard/monthly-profit-summary");
	return res.data;
};
