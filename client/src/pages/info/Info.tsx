import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { defaultMotionProps } from "../../styles/mixins/defaultMotionProps";

const Info: React.FC = () => {
	return (
		<Main {...defaultMotionProps} variants={_MotionVariants.Main}>
			{`Site Tech Stack:
					- Language: Typescript
					- Front-end:
						ReactJS, Framer-Motion, Styled-Components, React-Router, Radix UI for web compliance, RTK (Redux Tool Kit), Yup (form validation)
					- Backend:
						Express, Mongoose(MongoDB manipulation), bcrypt(password hash), envalid/dotenv(env validation), http-errors(http error handling), morgan(dev logging)
					- Database:
						MongoDB
					- Cloud Infrastructure:
						Render (Backend), Netlify (Front-end), Atlas(MongoDB)
			`}
		</Main>
	);
};

const Main = styled(motion.section)(
	({ theme }) => `
	${theme.mixins.flex.flxCntrCntr}
	height: 100%;
	padding: 5rem;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;

	color: rgb(${theme.color.secondary.dark});
  text-shadow: ${theme.font.shadow.medium};
  font-family: ${theme.font.style.flower};
	font-weight: 900;
	font-size 3.5rem;
	text-align: center;
`
);

const _MotionVariants = {
	Main: {
		initial: {
			y: -100,
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
			},
		},
	},
};

export default Info;
