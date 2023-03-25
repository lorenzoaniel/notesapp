import { motion } from "framer-motion";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import Note from "../../components/Note";
import { device } from "../../styles/breakpoints";
import AddButton from "../../components/buttons/AddButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNote, fetchNotes, selectNoteApi } from "../../redux/features/noteApiSlice";
import { TypeNote } from "../../models/note";
import { selectUserApi } from "../../redux/features/userApiSlice";
import { defaultMotionProps } from "../../styles/mixins/defaultMotionProps";

const Home: React.FC = () => {
	const user = useAppSelector(selectUserApi).user;
	const notes = useAppSelector(selectNoteApi);
	const dispatch = useAppDispatch();
	const [showNotes, setShowNotes] = useState<ReactElement[]>([]);
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
		user.username && _createNotes(notes); //only works due to the condition in noteApiSlice that compares payload and local state as well as user authenticated
	}, [notes]);

	return (
		<Main {...defaultMotionProps} variants={_MotionVariants.Main}>
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
				<>
					{isSafari ? (
						<LoginPrompt variants={_MotionVariants.LoginPrompt}>
							{
								"Unfortunately this app does not work on safari, unless I register a subdomain which costs money. If you would like to try otherr browsers: Chrome, Firefox and Edge will work."
							}
						</LoginPrompt>
					) : (
						<LoginPrompt variants={_MotionVariants.LoginPrompt}>
							{
								"Please Log in or Sign up. If you would like to test the app here are some test credentials: username: testuser, password: testpass"
							}
						</LoginPrompt>
					)}
				</>
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

const LoginPrompt = styled(motion.div)(
	({ theme }) => `
	background: transparent;
	height: fit-content;
	flex: 0 1 fit-content;
	padding: 1rem;

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
			opacity: 0,
		},
		animate: {
			opacity: 1,
		},
	},
	LoginPrompt: {
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

export default Home;
