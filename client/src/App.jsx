import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import VehicleListPage from "./pages/VehicleListPage";
import VehicleFormPage from "./pages/VehicleFormPage";
import DriverListPage from "./pages/DriverListPage";
import DriverFormPage from "./pages/DriverFormPage";
import ExpenseTypeManagerPage from "./pages/ExpenseTypeManagerPage";
import ExpenseListPage from "./pages/ExpenseListPage";
import ExpenseFormPage from "./pages/ExpenseFormPage";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />

					<Route
						path="/"
						element={
							<PrivateRoute>
								<MainLayout>
									<DashboardPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>

					{/* Add other protected routes here */}
					<Route
						path="/vehicles"
						element={
							<PrivateRoute>
								<MainLayout>
									<VehicleListPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/vehicles/add"
						element={
							<PrivateRoute>
								<MainLayout>
									<VehicleFormPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/vehicles/edit/:id"
						element={
							<PrivateRoute>
								<MainLayout>
									<VehicleFormPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/drivers"
						element={
							<PrivateRoute>
								<MainLayout>
									<DriverListPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/drivers/add"
						element={
							<PrivateRoute>
								<MainLayout>
									<DriverFormPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/drivers/edit/:id"
						element={
							<PrivateRoute>
								<MainLayout>
									<DriverFormPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/expenses"
						element={
							<PrivateRoute>
								<MainLayout>
									<ExpenseListPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/expense/add"
						element={
							<PrivateRoute>
								<MainLayout>
									<ExpenseFormPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/expense/edit/:id"
						element={
							<PrivateRoute>
								<MainLayout>
									<ExpenseFormPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
					<Route
						path="/settings/expense-types"
						element={
							<PrivateRoute>
								<MainLayout>
									<ExpenseTypeManagerPage />
								</MainLayout>
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
export default App;
