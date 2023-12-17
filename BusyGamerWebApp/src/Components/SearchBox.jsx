import React, { useRef, useEffect } from "react";
import ReactDom from "react-dom";

export default function SearchBox({ open, onClose }) {
	if (!open) return null;

	return ReactDom.createPortal(
		<>
			<div
				className="fixed top-0 right-0 left-0 bottom-0 w-screen h-screen bg-opacity-70 backdrop-blur-md bg-black z-10 flex justify-center pt-32"
				onClick={onClose}
			>
				<div
					className="w-4/5 h-14 bg-app-main z-20 rounded-xl drop-shadow-3xl"
					onClick={(e) => e.stopPropagation()}
				>
					<form>
						<input
							type="text"
							className="w-full h-14 rounded-xl bg-app-main font-extrabold text-2xl text-white placeholder:text-app-grey placeholder:text-2xl placeholder:font-extrabold pl-6 outline-none focus:border-b-[1px] focus:border-opacity-50 transition-all"
							placeholder="WHAT ARE WE PLAYING NEXT?"
						/>
						<div className="text-app-grey text-2xl relative float-right right-6 -top-11 pointer-events-none">
							
						</div>
					</form>
				</div>
			</div>
		</>,
		document.getElementById("portal")
	);
}
