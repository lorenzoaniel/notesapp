import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { device } from "../../styles/breakpoints";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getLoggedInUser, logout, selectUserApi } from "../../redux/features/userApiSlice";

import Item from "./Item";
import { useNavigate } from "react-router";

const Navbar: React.FC = () => {
	const user = useAppSelector(selectUserApi).user;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return (
		<Main>
			<List>
				<Item
					handleClick={() => {
						navigate("/home");
					}}
				>
					<LinkPrimary>NotesApp</LinkPrimary>
				</Item>
				<Item
					handleClick={() => {
						navigate("/privacy");
					}}
				>
					<LinkSecondary>Privacy</LinkSecondary>
				</Item>
				<ItemFiller />
				{user.username ? (
					<>
						<LinkSecondary>Signed in as: {user.username}</LinkSecondary>
						<Item
							handleClick={() => {
								dispatch(logout());
							}}
						>
							<LinkPrimary>Log Out</LinkPrimary>
						</Item>
					</>
				) : (
					<Item
						handleClick={() => {
							dispatch(getLoggedInUser());
						}}
					>
						<LinkSecondary
							onClick={() => {
								navigate("/loginorsignup");
							}}
						>
							SignUp/Login
						</LinkSecondary>
					</Item>
				)}
			</List>
		</Main>
	);
};

const Main = styled(NavigationMenu.Root)(
	({ theme }) => `
	${theme.mixins.flex.flxCntrCntr}
	background: rgb(${theme.color.primary.dark});
	height: fit-content;
	box-shadow: 0 0 1rem 0.5rem rgb(${theme.color.primary.dark}), 0 0 1rem 0.1rem rgb(0,0,0,0.5) inset;
	border-radius: 0 0 1rem 1rem;
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
