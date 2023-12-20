import React, { useState } from "react";

export default function Tracking() {
	const [isActive, setIsActive] = useState(true);

	const toggleTrackingSection = () => {
		setIsActive(!isActive);
	};

	return (
		<>
			{isActive ? (
				<div
					className="fixed left-0 h-full w-12 p-2 bg-app-secondary z-10 drop-shadow-3xl cursor-pointer"
					onClick={toggleTrackingSection}
				>
					<div className="text-2xl font-black w-16 h-12 mt-2 rounded-md bg-app-secondary  cursor-pointer flex items-center justify-center pl-1 pointer-events-none">
						󰞔
					</div>
				</div>
			) : (
				<div
					className="fixed h-full w-full z-10 bg-black backdrop-blur-md bg-opacity-50 animate-fade-in"
					onClick={toggleTrackingSection}
				>
					<div
						className="fixed left-0 h-full w-1/2 p-2 bg-app-secondary z-10 drop-shadow-3xl animate-left-in"
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className="fixed text-2xl -right-10 font-black w-16 h-12 mt-2 rounded-md bg-app-secondary  cursor-pointer flex items-center justify-center pl-1"
							onClick={toggleTrackingSection}
						>
							󰞓
						</div>
						<div className="text-3xl font-extrabold p-2">
							THIS WILL TAKE A WHILE...
							<div className="bg-app-complementary w-4/6 h-2"></div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
