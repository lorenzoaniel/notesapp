import React from "react";
import * as Form from "@radix-ui/react-form";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { motion } from "framer-motion";
import TextInput from "./TextInput";

interface Inputs {
	username: string;
	userpass: string;
}

const schema = yup.object({
	username: yup.string().required("Username is required").max(16, "maximum of 16 characters"),
	userpass: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(16, "maximum of 16 characters")
		.required("Password is required"),
});

const Login: React.FC = () => {
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
				name={"userpass"}
				label={"Password"}
				type="text"
				placeholder="password"
				register={register}
				registerOptions={{ required: "Required" }}
				error={errors.userpass}
			/>

			<Submit>Login</Submit>
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

export default Login;
