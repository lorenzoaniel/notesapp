import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

import { TypeNote } from "../models/note";

import { GiTrashCan } from "react-icons/gi";
import { useAppDispatch } from "../redux/hooks";
import { deleteNote, fetchNotes, updateNote } from "../redux/features/noteApiSlice";

const Note: React.FC<TypeNote> = ({ _id, title, text, createdAt, updatedAt }) => {
	const [disabled, setDisabled] = useState(false);
	const dispatch = useAppDispatch();

	const convertTime = (timeToCovert: string) => {
		// Convert the UTC-formatted date string to a local date string with a 12-hour clock format
		const localDateString = new Date(timeToCovert).toLocaleString("en-US", {
			hour: "numeric", // set the hour component to the "numeric" format (i.e. 1, 2, ..., 12)
			minute: "numeric", // set the minute component to the "numeric" format (i.e. 0, 1, ..., 59)
			hour12: true, // use a 12-hour clock format with AM/PM indicator
		});

		// Replace the "T" and ".429Z" substrings in the UTC-formatted date string with spaces,
		// and format the time component of the date string to use a 12-hour clock format with AM/PM indicator
		const formattedDate = timeToCovert
			.replace(/T|(\.\d{3})Z/g, " ") // replace the "T" and ".429Z" substrings with spaces
			.replace(/:\d{2}$/g, (match) => {
				// format the time component of the date string to use a 12-hour clock format with AM/PM indicator
				return match.replace(":", "");
			})
			.replace(/\d{2}:\d{2}:\d{2}/g, localDateString); // replace the time component with the local date string

		// Print the formatted date string
		return formattedDate; // prints in format of local browser time ex: "3/17/2023 at 6:51 PM"
	};

	//makes sure there is an actual change in the text instead of wasting resources calling api
	const updateNoteOptimized = async (
		event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>,
		compareValue: string = "",
		isTitle: boolean
	) => {
		const eventValue = event.currentTarget.value.trimEnd(); //does not include spaces in the end of value
		//makes sure there is an actual change
		if (compareValue !== eventValue) {
			console.log("update");
			await dispatch(
				updateNote({
					_id,
					title: isTitle ? event.currentTarget.value : title, //varies based on isTitle condition, if title reads current else reads prev val
					text: isTitle ? text : event.currentTarget.value, // same as above but vice versa
				})
			);
		} else {
			console.log("no update");
		}
	};

	return (
		<Main disabled={disabled} variants={_MotionVariants.Main} initial="initial" animate="animate">
			<Header>
				<Title
					onBlur={async (event) => {
						await updateNoteOptimized(event, title, true);
					}}
					type="text"
					defaultValue={title}
					maxLength={32}
				/>
				<IconWrapper
					onClick={async () => {
						await setDisabled(true);
						await dispatch(deleteNote(_id));
						dispatch(fetchNotes()); //required since response is nothing and notes managed state will not change have to manually change it with a request
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
					await updateNoteOptimized(event, text, false);
				}}
				defaultValue={text}
			/>
			{updatedAt > createdAt
				? "Updated at: " + convertTime(updatedAt)
				: "Created at: " + convertTime(createdAt)}
		</Main>
	);
};

interface Main {
	disabled: boolean;
}

const Main = styled(motion.div)<Main>(
	({ theme, disabled }) => `
	${theme.mixins.flex.flxColCntrCntr}
  background: rgb(${theme.color.primary.medium});
  min-height: 27rem;
	max-height: 27rem;
	min-width: 30rem;
	max-width: 30rem;
	padding-bottom: 0.5rem;

	pointer-events: ${disabled ? "none" : "auto"};
	opacity: ${disabled ? 0.5 : 1};

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
	margin-top: 0.2rem;
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
	Main: {
		initial: {
			scale: 0,
		},
		animate: {
			scale: 1,
		},
	},
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
