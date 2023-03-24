import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { defaultMotionProps } from "../../styles/mixins/defaultMotionProps";

const Loading: React.FC = () => {
	return (
		<Main {...defaultMotionProps} variants={_MotionVariants.Main}>
			{"Loading"}
		</Main>
	);
};

const Main = styled(motion.section)(
	({ theme }) => `
	${theme.mixins.flex.flxCntrCntr}
	background: rgb(${theme.color.secondary.light});
	height: 100%;
	padding: 5rem;
	overflow: hidden;
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

export default Loading;
