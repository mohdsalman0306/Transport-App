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

const Sidebar = () => {
	const navItems = [
		{ name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
		{ name: "Vehicles", path: "/vehicles", icon: <FaTruck /> },
		{ name: "Drivers", path: "/drivers", icon: <FaUserTie /> },
		{ name: "Expenses", path: "/expenses", icon: <FaMoneyBill /> },
		{ name: "Reports", path: "/reports", icon: <FaListAlt /> },
		{ name: "Expense Type", path: "/settings/expense-types", icon: <FaChartBar /> },
	];

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
				<button className="flex items-center px-4 py-2 text-sm text-red-600 mt-4 hover:bg-red-100 rounded">
					<FaSignOutAlt className="mr-3" /> Logout
				</button>
			</nav>
		</aside>
	);
};

export default Sidebar;
