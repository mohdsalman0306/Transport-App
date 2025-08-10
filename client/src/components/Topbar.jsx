const Topbar = () => {
	return (
		<header className="w-full h-14 bg-white shadow flex items-center justify-between px-4 border-b">
			<h1 className="text-lg font-semibold">Dashboard</h1>
			<div>
				<span className="text-sm text-gray-500">Welcome, User</span>
			</div>
		</header>
	);
};

export default Topbar;
