import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout({ children }) {
	return (
		<div className="w-full flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<Topbar />
				<main className="p-4 overflow-auto flex-1">{children}</main>
			</div>
		</div>
	);
}
