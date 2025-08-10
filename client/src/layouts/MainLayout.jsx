import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				<Topbar setSidebarOpen={setSidebarOpen} />
				<main className="p-4 overflow-auto">{children}</main>
			</div>
		</div>
	);
}
