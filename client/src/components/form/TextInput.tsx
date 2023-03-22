import React from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { resetError, selectUserApi } from "../../redux/features/userApiSlice";
import { useAppSelector } from "../../redux/hooks";

interface TextInputType {
	name: string;
	label: string;
	register: UseFormRegister<any>; //dont know what type
	registerOptions?: RegisterOptions;
	error?: FieldError;
	[x: string]: any; //pass any other props that we have not yet defined
}

const TextInput: React.FC<TextInputType> = ({
	name,
	label,
	register,
	registerOptions,
	error,
	...props
}) => {
	const dispatch = useDispatch();
	const apiError = useAppSelector(selectUserApi).errors;
	return (
		<Field name={name}>
			<Label>{label}</Label>
			<Control
				onFocus={() => {
					dispatch(resetError());
				}}
				{...props}
				{...register(name, registerOptions)}
			/>
			<Form.Message>{error ? error.message : apiError ? apiError.message : " "}</Form.Message>
		</Field>
	);
};

const Field = styled(Form.Field)(
	({ theme }) => `
	${theme.mixins.flex.flxColCntrCntr}
`
);

const Control = styled(Form.Control)(
	({ theme }) => `
	border: none;
	border-radius: 0.5rem;
	padding: 1rem;
	flex: 0 1 fit-content;
`
);

const Label = styled(Form.Label)(
	({ theme }) => `
	font-family: ${theme.font.style.flower};
	font-weight: 600;
	font-size: 4rem;
	color: rgb(${theme.color.secondary.dark});
  text-shadow: ${theme.font.shadow.medium};
`
);

export default TextInput;
