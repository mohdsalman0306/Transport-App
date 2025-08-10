import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const LoginPage = () => {
	const [mobile, setMobile] = useState("");
	const [otp, setOtp] = useState("");
	const [step, setStep] = useState(1);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleMobileSubmit = async () => {
		try {
			// Here you can trigger backend to accept mobile and send OTP (skipped here)
			setStep(2);
		} catch (err) {
			console.error(err);
		}
	};

	const handleOtpSubmit = async () => {
		try {
			if (otp !== "123456") {
				alert("Invalid OTP");
				return;
			}

			const res = await api.post("/auth/login", { mobile, otp }); // your backend login
			login(res.data.token, res.data.user);
			navigate("/");
		} catch (err) {
			console.error(err);
			alert("Login failed");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-50">
			<div className="w-full max-w-sm p-6 bg-white rounded shadow">
				<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

				{step === 1 ? (
					<>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleMobileSubmit();
							}}
						>
							<label className="block text-sm mb-2">Mobile Number</label>
							<input
								type="text"
								value={mobile}
								onChange={(e) => setMobile(e.target.value)}
								className="w-full border rounded px-3 py-2 mb-4"
								placeholder="Enter mobile number"
							/>
							<button className="w-full bg-blue-600 text-white py-2 rounded">
								Send OTP
							</button>
						</form>
					</>
				) : (
					<>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleOtpSubmit();
							}}
						>
							<label className="block text-sm mb-2">Enter OTP</label>
							<input
								type="text"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								className="w-full border rounded px-3 py-2 mb-4"
								placeholder="Enter 1234"
							/>
							<button className="w-full bg-green-600 text-white py-2 rounded">
								Login
							</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default LoginPage;
