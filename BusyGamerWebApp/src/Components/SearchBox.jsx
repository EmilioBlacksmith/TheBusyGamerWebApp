import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";

export default function SearchBox({ open, onClose, valueSearched }) {
	const [value, setValue] = useState("");
	const searchBarRef = useRef(null);

	useEffect(() => {
		if (open && searchBarRef.current) {
			searchBarRef.current.focus();
		}
	}, [open]);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onSearch = (event) => {
		event.preventDefault();

		if (value === "") {
			console.log("Nothing Searched");
		} else {
			valueSearched(value);
			setValue("");
			onClose();
		}
	};

	if (!open) return null;

	return ReactDom.createPortal(
		<>
			<div
				className="fixed top-0 right-0 left-0 bottom-0 w-screen h-screen bg-opacity-70 backdrop-blur-md bg-black z-10 flex justify-center pt-32 animate-fade-in"
				onClick={onClose}
			>
				<div
					className="w-4/5 h-14 bg-app-main z-20 rounded-xl drop-shadow-3xl"
					onClick={(e) => e.stopPropagation()}
				>
					<form onSubmit={onSearch}>
						<input
							type="text"
							className="w-full h-14 rounded-xl bg-app-main font-extrabold text-2xl text-white placeholder:text-app-grey placeholder:text-2xl placeholder:font-extrabold pl-6 outline-none focus:border-b-[1px] focus:border-opacity-50 transition-all"
							placeholder="WHAT ARE WE PLAYING NEXT?"
							value={value}
							onChange={onChange}
							ref={searchBarRef}
						/>
						<button
							className="text-app-grey text-2xl relative float-right right-6 -top-11 cursor-pointer"
							type="submit"
						>
							 SEARCH
						</button>
					</form>
				</div>
			</div>
		</>,
		document.getElementById("portal")
	);
}
