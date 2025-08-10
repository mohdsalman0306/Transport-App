import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const [user, setUser] = useState(() => {
		const saved = localStorage.getItem("user");
		return saved ? JSON.parse(saved) : null;
	});

	const login = (token, user) => {
		setToken(token);
		// setUser(user);
		localStorage.setItem("token", token);
		// localStorage.setItem("user", JSON.stringify(user));
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
		// localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ token, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Hook
export const useAuth = () => useContext(AuthContext);
