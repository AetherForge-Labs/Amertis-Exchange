import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"background-Test":
					"radial-gradient(ellipse at 50% 50%, rgba(76, 23, 91, 1) 0%, rgba(35, 7, 43, 1) 43%, rgba(35, 7, 43, 1) 100%)",
			},
			colors: {
				background: "hsl(var(--background))",
				mainBG: "#140123",
				foreground: "#8F199B",
				mainDark: "#0a0111",
				mainLight: "#2a0843",
				mainFG: "#8F199B",
				secFG: "#661a6e",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
