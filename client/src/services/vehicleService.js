import api from "./api";

export const getVehicles = async () => {
	const res = await api.get("/vehicle");
	return res.data;
};

export const getVehicleById = async (id) => {
	const res = await api.get(`/vehicle/${id}`);
	return res.data;
};

export const addVehicle = async (data) => {
	console.log("Adding vehicle with data:", data);
	const res = await api.post("/vehicle", data);
	return res.data;
};

export const updateVehicle = async (id, data) => {
	const res = await api.put(`/vehicles/${id}`, data);
	return res.data;
};

export const deleteVehicle = async (id) => {
	const res = await api.delete(`/vehicles/${id}`);
	return res.data;
};
