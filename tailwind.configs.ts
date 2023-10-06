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
			},

			gridTemplateColumns: {
				"auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
				"auto-fill-250": "repeat(auto-fill, minmax(250px, 1fr))",
				"auto-fill-350": "repeat(auto-fill, minmax(300px, 1fr))",
			},
			colors: {
				"primary-color": "#491511",
				"primary-color-dark:": " #25485c",
				"primary-color-darkest": " #300d0b",
				"primary-color-light": " #facb85",
				"primary-color-lighter": " #e7f3f1",
				"primary-color-lightest": " #d1dbdd",
				// "primary-color": "#40687e",
				// "primary-color-dark:": " #25485c",
				// "primary-color-darkest": " #18303d",
				// "primary-color-light": " #809fa9",
				// "primary-color-lighter": " #e7f3f1",
				// "primary-color-lightest": " #d1dbdd",
			},
		},
	},
	plugins: [],
};
export default config;
