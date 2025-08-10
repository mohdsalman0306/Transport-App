import { NavLink } from "react-router-dom"; // fixed 'react-router' to 'react-router-dom'
import {
	FaTruck,
	FaUserTie,
	FaMoneyBill,
	FaChartBar,
	FaTachometerAlt,
	FaSignOutAlt,
	FaListAlt,
	FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const navItems = [
		{ name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
		{ name: "Vehicles", path: "/vehicles", icon: <FaTruck /> },
		{ name: "Drivers", path: "/drivers", icon: <FaUserTie /> },
		{ name: "Expenses", path: "/expenses", icon: <FaMoneyBill /> },
		// { name: "Reports", path: "/reports", icon: <FaListAlt /> },
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
		<>
			{/* Mobile Sidebar */}
			<div
				className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
					sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setSidebarOpen(false)}
			></div>

			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform z-50 
				${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
				md:translate-x-0 md:static md:block`}
			>
				{/* Header with close button (mobile only) */}
				<div className="flex items-center justify-between p-4 border-b">
					<div className="text-xl font-bold">Transport App</div>
					<button
						className="md:hidden text-gray-600"
						onClick={() => setSidebarOpen(false)}
					>
						<FaTimes className="h-5 w-5" />
					</button>
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
							onClick={() => setSidebarOpen(false)} // auto-close on mobile
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
		</>
	);
};

export default Sidebar;
