import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Note from "../../components/Note";
import { device } from "../../styles/breakpoints";
import AddButton from "../../components/buttons/AddButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNote, fetchNotes, selectNoteApi } from "../../redux/features/noteApiSlice";

const Home: React.FC = () => {
	const notes = useAppSelector(selectNoteApi);
	const dispatch = useAppDispatch();

	const _createNotes = () => {
		return notes.map((currNote) => {
			return (
				<Note
					key={currNote._id}
					_id={currNote._id}
					title={currNote.title}
					text={currNote.text}
					createdAt={currNote.createdAt}
					updatedAt={currNote.updatedAt}
				/>
			);
		});
	};

	useEffect(() => {
		// console.log("rerender");
		dispatch(fetchNotes());
	}, [notes]);

	return (
		<Main>
			<AddButton
				title="Add Note"
				handleClick={() => {
					dispatch(createNote());
				}}
			/>
			<Board>{_createNotes()}</Board>
		</Main>
	);
};

const Main = styled(motion.section)(
	({ theme }) => `
	${theme.mixins.flex.flxCntrCntr}
	height: 100%;
	padding: 1rem;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`
);

const Board = styled(motion.div)(
	({ theme }) => `
	height: 90%;
	display: flex;
	align-items: center;
	flex-direction: column;
	row-gap: 1rem;
	padding: 1rem;
	overflow-y: scroll;

	/* Hide scrollbar for Chrome and Edge */
	&::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgb(${theme.color.secondary.medium});
		border-radius: 0.4rem;
	}

	@media ${device.tablet} {
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 1rem;
		align-items: flex-start;
		justify-content: center;
	}
`
);

export default Home;
