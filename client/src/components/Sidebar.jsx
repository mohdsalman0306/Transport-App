import { NavLink } from "react-router";
import {
	FaTruck,
	FaUserTie,
	FaMoneyBill,
	FaChartBar,
	FaTachometerAlt,
	FaSignOutAlt,
	FaListAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Sidebar = () => {
	const navItems = [
		{ name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
		{ name: "Vehicles", path: "/vehicles", icon: <FaTruck /> },
		{ name: "Drivers", path: "/drivers", icon: <FaUserTie /> },
		{ name: "Expenses", path: "/expenses", icon: <FaMoneyBill /> },
		{ name: "Reports", path: "/reports", icon: <FaListAlt /> },
		{
			name: "Expense Type",
			path: "/settings/expense-types",
			icon: <FaChartBar />,
		},
	];
	const { logout } = useAuth();

	const handleLogout = async () => {
		const res = await api.post("/auth/logout");
		console.log("Logout response:", res);
		if (res.status !== 204) {
			console.error("Logout Failed with status:", res.status);
			return;
		}
		logout();
	};

	return (
		<aside className="w-64 bg-white shadow-md hidden md:block">
			<div className="p-4 text-xl font-bold text-center border-b">
				Transport App
			</div>
			<nav className="flex flex-col p-4 space-y-2">
				{navItems.map((item) => (
					<NavLink
						to={item.path}
						key={item.name}
						className={({ isActive }) =>
							`flex items-center px-4 py-2 rounded text-sm font-medium transition hover:bg-gray-200 ${
								isActive ? "bg-gray-200 text-blue-600" : "text-gray-700"
							}`
						}
					>
						<span className="mr-3">{item.icon}</span>
						{item.name}
					</NavLink>
				))}

				{/* Logout */}
				<button
					onClick={handleLogout}
					className="flex items-center px-4 py-2 text-sm text-red-600 mt-4 hover:bg-red-100 rounded cursor-pointer"
				>
					<FaSignOutAlt className="mr-3" /> Logout
				</button>
			</nav>
		</aside>
	);
};

export default Sidebar;
