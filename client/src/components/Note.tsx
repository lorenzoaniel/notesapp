import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

import { GiTrashCan } from "react-icons/gi";

interface Note {
	title?: string;
	text?: string;
	modifiedStatus?: string;
}

const Note: React.FC<Note> = ({
	text = "test Content",
	title = "test title",
	modifiedStatus = "test date here",
}) => {
	return (
		<Main>
			<Header>
				{title}
				<IconWrapper>
					<GiTrashCan style={icon_style} />
				</IconWrapper>
			</Header>
			<Text>{text}</Text>
			{modifiedStatus}
		</Main>
	);
};

const Main = styled(motion.div)(
	({ theme }) => `
	${theme.mixins.flex.flxColCntrCntr}
  min-height: 27rem;
	max-height: 27rem;
	min-width: 30rem;
	max-width: 30rem;
  background: rgb(${theme.color.primary.medium});

	border-radius: 0.5rem;
	box-shadow: 0 0 0.5rem 0.1rem black inset;
	font-family: ${theme.font.style.flower};
	font-weight: 600;
`
);

const Header = styled(motion.div)(
	({ theme }) => `
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;
`
);

const IconWrapper = styled(motion.div)(
	({ theme }) => `
	height: 3rem;
	max-width: 3rem;
`
);

const icon_style = {
	height: "100%",
	width: "100%",
	filter: "drop-shadow(0 0rem 0.2rem rgb(0,0,0,1))",
};

const Text = styled(motion.p)(
	({ theme }) => `
	background: rgb(${theme.color.primary.light});
	min-height: 20rem;
	max-height: 20rem;
	width: 100%;
	z-index: 1;
	padding: 0.5rem;
	margin: 0.5rem 0rem;
	box-shadow: 0 0 0.5rem 0.1rem black;

	color: black;
	word-break: break-all;

	overflow-y: scroll;
`
);

export default Note;
