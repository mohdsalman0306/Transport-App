import { FaBars } from "react-icons/fa";

const Topbar = ({ setSidebarOpen }) => {
	return (
		<header className="w-full h-14 bg-white shadow flex items-center justify-between px-4 border-b">
			{/* Left side: Hamburger (only on mobile) + Title */}
			<div className="flex items-center gap-3">
				<button
					className="md:hidden text-gray-700 focus:outline-none"
					onClick={() => setSidebarOpen(true)}
				>
					<FaBars className="h-5 w-5" />
				</button>
				<h1 className="text-lg font-semibold">Dashboard</h1>
			</div>

			{/* Right side */}
			<div>
				<span className="text-sm text-gray-500">Welcome, User</span>
			</div>
		</header>
	);
};

export default Topbar;
