/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			"app-main": "#2D2D2D",
			"app-secondary": "#242424",
			"app-secondary-dark": "#171717",
			"app-complementary": "#0063AA",
			"app-grey": "#696969",
			white: "#FFF",
			black: "#000",
			red: "#FF0000",
		},
		fontFamily: {
			sans: ["JetBrains"],
		},
		extend: {
			dropShadow: {
				"3xl": "0 0px 6px rgba(0, 0, 0, .5)",
			},
			keyframes: {
				leftIn: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				fadeOut: {
					"0%": { opacity: 1 },
					"100%": { opacity: 0 },
				},
			},
			animation: {
				"left-in": "leftIn .15s ease-in-out forwards",
				"fade-in": "fadeIn .1s ease forwards",
				"fade-out": "fadeIn .1s ease forwards",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
