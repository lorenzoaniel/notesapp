import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar/Navbar";

interface Props {
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<Main>
			<Header>
				<Navbar />
			</Header>
			<Content>{children}</Content>
		</Main>
	);
};

const Main = styled(motion.main)(
	({ theme }) => `
	background: rgb(${theme.color.secondary.light});
	height: inherit;
  
	display: flex;
	flex-direction: column;
`
);

const Header = styled.header`
	height: fit-content;
	display: flex;
`;

const Content = styled.section(
	({ theme }) => `
  ${theme.mixins.flex.flxCntrCntr}
  height: 90%;
	overflow: hidden;
`
);

export default Layout;
