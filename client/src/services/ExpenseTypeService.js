import api from "./api";

export const getExpenseTypes = async () => {
	const res = await api.get("/expense-types");
	return res.data;
};

export const addExpenseType = async (name) => {
	const res = await api.post("/expense-types", { name });
	return res.data;
};

export const deleteExpenseType = async (id) => {
	const res = await api.delete(`/expense-types/${id}`);
	return res.data;
};
