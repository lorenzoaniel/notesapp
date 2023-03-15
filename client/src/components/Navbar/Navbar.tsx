import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { device } from "../../styles/breakpoints";

import Item from "./Item";

const Navbar: React.FC = () => {
	return (
		<Main>
			<List>
				<Item>
					<LinkPrimary>NotesApp</LinkPrimary>
				</Item>
				<Item>
					<LinkSecondary>Privacy</LinkSecondary>
				</Item>
				<ItemFiller />
				<Item>
					<LinkSecondary>Signed in as: Sample</LinkSecondary>
				</Item>
				<Item>
					<LinkPrimary>Log Out</LinkPrimary>
				</Item>
			</List>
		</Main>
	);
};

const Main = styled(NavigationMenu.Root)(
	({ theme }) => `
	${theme.mixins.flex.flxCntrCntr}
	background: rgb(${theme.color.primary.dark});
	height: fit-content;
`
);

const List = styled(NavigationMenu.List)(
	({ theme }) => `
	margin: 0 auto;
	padding: 1vmin 5vmin;
	list-style-type: none;

	width: 90%;
	display: flex;
	justify-content: space-around;
	row-gap: 1vmin;
	flex-wrap: wrap;
`
);

const ItemFiller = styled(NavigationMenu.Item)`
	display: flex;

	@media ${device.tablet} {
		flex-grow: 4;
	}
`;

const LinkPrimary = styled(motion(NavigationMenu.Link))(
	({ theme }) => `
	${theme.mixins.flex.flxCntrCntr}
	width: fit-content;
	padding: 1rem;

	font-family: ${theme.font.style.flower};
	font-weight: 900;
	font-size: 1.5rem;
	color: rgb(${theme.color.secondary.dark});
	text-shadow: ${theme.font.shadow.dark};

	@media ${device.tablet} {
		font-size: 3rem;
	}
`
);

const LinkSecondary = styled(LinkPrimary)(
	({ theme }) => `
`
);

export default Navbar;
