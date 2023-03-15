// export interface Base {
// 	color: {
// 		primary: {
// 			light: string;
// 			medium: string;
// 			dark: string;
// 		};
// 		secondary: {
// 			accent: string;
// 			light: string;
// 			medium: string;
// 			dark: string;
// 		};
// 	};
// }
import { flex_mixins } from "../mixins/flex_mixins";

const base = {
	mixins: {
		flex: flex_mixins,
	},
	color: {
		primary: {
			light: "255, 215, 145",
			medium: "164, 135, 101",
			dark: "73, 54, 56",
		},
		secondary: {
			accent: "228, 177, 171",
			light: "227, 150, 149",
			medium: "223, 115, 115",
			dark: "218, 85, 82",
		},
	},
	font: {
		style: {
			flower: "'Indie Flower', cursive",
		},
		shadow: {
			light: "0 0.1rem 0.1rem rgb(0,0,0,0.5)",
			medium: "0 0.1rem 0.2rem rgb(0,0,0,0.8)",
			dark: "0 0.1rem 0.5rem rgb(0,0,0,1)",
		},
	},
};

export default base;
