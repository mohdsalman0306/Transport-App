import api from "./api";

// Get all expenses
export const getExpenses = async () => {
	try {
		const res = await api.get("/expenses");
		return res.data;
	} catch (error) {
		handleError(error);
	}
};

// Get a single expense by ID
export const getExpenseById = async (id) => {
	try {
		const res = await api.get(`/expenses/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
};

// Add a new expense
export const addExpense = async (data) => {
	try {
		const res = await api.post("/expenses", data);
		return res.data;
	} catch (error) {
		handleError(error);
	}
};

// Update an existing expense
export const updateExpense = async (id, data) => {
	try {
		const res = await api.put(`/expenses/${id}`, data);
		return res.data;
	} catch (error) {
		handleError(error);
	}
};

// Delete an expense
export const deleteExpense = async (id) => {
	try {
		const res = await api.delete(`/expenses/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
};

// Centralized error handler
const handleError = (error) => {
	if (error.response && error.response.data && error.response.data.message) {
		throw new Error(error.response.data.message);
	} else {
		throw new Error("Something went wrong, please try again.");
	}
};
