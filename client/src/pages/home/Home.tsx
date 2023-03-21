import { motion } from "framer-motion";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Note from "../../components/Note";
import { device } from "../../styles/breakpoints";
import AddButton from "../../components/buttons/AddButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNote, fetchNotes, selectNoteApi } from "../../redux/features/noteApiSlice";
import { TypeNote } from "../../models/note";
import { User } from "../../models/user";
import { selectUserApi } from "../../redux/features/userApiSlice";

const Home: React.FC = () => {
	const user = useAppSelector(selectUserApi).user;
	const notes = useAppSelector(selectNoteApi);
	const dispatch = useAppDispatch();
	const [showNotes, setShowNotes] = useState<ReactElement[]>([]);

	const _createNotes = async (noteArray: TypeNote[]) => {
		await dispatch(fetchNotes());
		setShowNotes(
			await noteArray.map((currNote) => {
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
			})
		);
	};

	useEffect(() => {
		// user.userpass && console.log("rerender home");
		user.username && _createNotes(notes); //only works due to the condition in noteApiSlice that compares payload and local state as well as user authenticated
	}, [notes, user]);

	return (
		<Main>
			{user.username ? (
				<>
					<AddButton
						title="Add Note"
						handleClick={() => {
							dispatch(createNote());
						}}
					/>
					<Board>{showNotes}</Board>
				</>
			) : (
				<div>Please Log in or Sign up</div>
			)}
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
