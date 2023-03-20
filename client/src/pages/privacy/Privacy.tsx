import React from "react";
import SignUp from "../../components/form/SignUp";
import styled from "styled-components";
import { motion } from "framer-motion";
import Login from "../../components/form/Login";
styled;

const Privacy: React.FC = () => {
	return (
		<Main>
			{/* <SignUp /> */}
			<Login />
		</Main>
	);
};

const Main = styled(motion.section)(
	({ theme }) => `
	${theme.mixins.flex.flxCntrCntr}
	height: 100%;
	padding: 5rem;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`
);

export default Privacy;
