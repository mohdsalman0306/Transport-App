import api from "./api";

export const getDrivers = async () => {
	const res = await api.get("/driver");
	return res.data;
};

export const getDriverById = async (id) => {
	const res = await api.get(`/driver/${id}`);
	return res.data;
};

export const addDriver = async (data) => {
	const res = await api.post("/driver", data);
	return res.data;
};

export const updateDriver = async (id, data) => {
	const res = await api.put(`/driver/${id}`, data);
	return res.data;
};

export const deleteDriver = async (id) => {
	const res = await api.delete(`/driver/${id}`);
	return res.data;
};
