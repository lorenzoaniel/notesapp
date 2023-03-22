import React from "react";
import * as Form from "@radix-ui/react-form";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { motion } from "framer-motion";
import TextInput from "./TextInput";
import { useAppDispatch } from "../../redux/hooks";
import { signUp } from "../../redux/features/userApiSlice";
import SubmitButton from "../buttons/SubmitButton";

interface Inputs {
	username: string;
	useremail: string;
	userpass: string;
}

const schema = yup.object({
	username: yup.string().required("Username is required").max(16, "maximum of 16 characters"),
	useremail: yup.string().email("Invalid email").required("Email is required"),
	userpass: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(16, "maximum of 16 characters")
		.required("Password is required"),
});

const SignUp: React.FC = () => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) });
	const onSubmit: SubmitHandler<Inputs> = (data) => dispatch(signUp(data));

	return (
		<Root onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				name={"username"}
				label={"Username"}
				type="text"
				placeholder="username"
				register={register}
				registerOptions={{ required: "Required" }}
				error={errors.username}
			/>

			<TextInput
				name={"useremail"}
				label={"Email"}
				type="text"
				placeholder="email"
				register={register}
				registerOptions={{ required: "Required" }}
				error={errors.useremail}
			/>

			<TextInput
				name={"userpass"}
				label={"Password"}
				type="text"
				placeholder="password"
				register={register}
				registerOptions={{ required: "Required" }}
				error={errors.userpass}
			/>

			<SubmitButton title={"Sign Up"} />
		</Root>
	);
};

const Root = styled(Form.Root)(
	({ theme }) => `
  background: rgb(${theme.color.secondary.accent});
  display: flex;
  flex-direction: column;
  flex 0 1 fit-content;
  padding: 5rem;
  gap: 2rem;
`
);

export default SignUp;
