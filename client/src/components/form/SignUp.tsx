import React from "react";
import * as Form from "@radix-ui/react-form";
import { RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { motion } from "framer-motion";
import TextInput from "./TextInput";
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

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({ resolver: yupResolver(schema) });
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data); //replace with dispatch

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
				label={"useremail"}
				type="text"
				placeholder="email"
				register={register}
				registerOptions={{ required: "Required" }}
				error={errors.useremail}
			/>

			<TextInput
				name={"userpass"}
				label={"userpass"}
				type="text"
				placeholder="password"
				register={register}
				registerOptions={{ required: "Required" }}
				error={errors.userpass}
			/>

			<Submit>Submit</Submit>
		</Root>
	);
};

const Root = styled(Form.Root)(
	({ theme }) => `
  background: rgb(${theme.color.secondary.accent});
  width: 100%;
  // max-height: 50%;
  display: flex;
  flex-direction: column;
`
);

const Submit = styled(motion(Form.Submit))(
	({ theme }) => `
  ${theme.mixins.flex.flxCntrCntr}
  background: rgb(${theme.color.primary.dark});
  column-gap: 1rem;
  padding: 1.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.1rem rgb(${theme.color.primary.dark}), 0 0 1rem 0.1rem rgb(0,0,0,0.5) inset;

  color: rgb(${theme.color.secondary.dark});
  text-shadow: ${theme.font.shadow.medium};
  font-family: ${theme.font.style.flower};
	font-weight: 900;
`
);

export default SignUp;
