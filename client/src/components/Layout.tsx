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
			<Footer>
				<small style={{ textAlign: "center" }}>&copy; Copyright 2023, Mikhail Lorenzo Aniel</small>
			</Footer>
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
  height: 85%;
	overflow: hidden;
`
);

const Footer = styled.section(
	({ theme }) => `
  ${theme.mixins.flex.flxCntrCntr}
  height: 5%;
	overflow: hidden;
	background: rgb(${theme.color.primary.dark});
	box-shadow: 0 0 1rem 0.5rem rgb(${theme.color.primary.dark}), 0 0 1rem 0.1rem rgb(0,0,0,0.5) inset;
	border-radius: 1rem 1rem 0 0;

	color: rgb(${theme.color.secondary.dark});
	text-shadow: ${theme.font.shadow.dark};
`
);

export default Layout;
