import { ReactNode } from "react";

const SummaryCard = ({
	title,
	value,
	icon,
	color = "bg-blue-100",
	textColor = "text-blue-700",
}) => {
	return (
		<div
			className={`p-4 rounded shadow-sm ${color} flex items-center justify-between`}
		>
			<div>
				<h4 className={`text-sm font-medium ${textColor}`}>{title}</h4>
				<p className="text-xl font-bold">{value}</p>
			</div>
			<div className="text-2xl">{icon}</div>
		</div>
	);
};

export default SummaryCard;
