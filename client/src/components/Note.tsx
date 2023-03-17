import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

import { TypeNote } from "../models/note";

import { GiTrashCan } from "react-icons/gi";
import { useAppDispatch } from "../redux/hooks";
import { deleteNote, fetchNotes, updateNote } from "../redux/features/noteApiSlice";

const Note: React.FC<TypeNote> = ({ _id, text, title, createdAt, updatedAt }) => {
	const [note, setNote] = useState<TypeNote>({ _id, text, title, createdAt, updatedAt });
	const dispatch = useAppDispatch();

	// console.log(note);
	// console.log({ _id, text, title, createdAt, updatedAt });

	return (
		<Main>
			<Header>
				<Title
					onBlur={async (event) => {
						await setNote((curr) => {
							return { ...curr, title: event.target.value };
						});
						await dispatch(updateNote({ _id: note._id, title: note.title, text: note.text }));
						await dispatch(fetchNotes());
					}}
					type="text"
					defaultValue={note.title}
					maxLength={32}
				/>
				<IconWrapper
					onClick={async () => {
						await dispatch(deleteNote(note._id));
						await dispatch(fetchNotes());
					}}
					variants={_MotionVariants.IconWrapper}
					initial="initial"
					whileHover="whileHover"
					whileTap="initial"
				>
					<GiTrashCan style={icon_style} />
				</IconWrapper>
			</Header>
			<Text
				onBlur={async (event) => {
					await setNote((curr) => {
						return { ...curr, text: event.target.value };
					});
					await dispatch(updateNote({ _id: note._id, title: note.title, text: note.text }));
					await dispatch(fetchNotes());
				}}
				defaultValue={note.text}
			/>
			{note.updatedAt > note.createdAt
				? "Updated at:" + note.updatedAt
				: "Created at:" + note.createdAt}
		</Main>
	);
};

const Main = styled(motion.div)(
	({ theme }) => `
	${theme.mixins.flex.flxColCntrCntr}
  background: rgb(${theme.color.primary.medium});
  min-height: 27rem;
	max-height: 27rem;
	min-width: 30rem;
	max-width: 30rem;
	padding-bottom: 0.5rem;

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

const Title = styled(motion.input)(
	({ theme }) => `
	background: transparent;
	padding: 0;
	margin: 0;
	border: none;
	height: 3rem;
	width: 25rem;

	font-family: ${theme.font.style.flower};
	font-weight: 600;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: normal;
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

const Text = styled(motion.textarea)(
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
	font-family: ${theme.font.style.flower};
	font-weight: 600;
	text-shadow: ${theme.font.shadow.light};

	overflow-y: scroll;
`
);

const _MotionVariants = {
	IconWrapper: {
		initial: {
			scale: 1,
			rotate: 0,
		},
		whileHover: {
			scale: 1.1,
			rotate: 5,
			transition: {
				type: "spring",
				damping: 0,
				stiffness: 200,
			},
		},
		whileTap: {
			scale: 0,
			rotate: 0,
		},
	},
};

export default Note;
