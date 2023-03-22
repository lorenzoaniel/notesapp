import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { motion } from "framer-motion";
import Login from "../../components/form/Login";
import SignUp from "../../components/form/SignUp";
import { useAppDispatch } from "../../redux/hooks";
import { resetError } from "../../redux/features/userApiSlice";

const LoginOrSignUp: React.FC = () => {
	const dispatch = useAppDispatch();
	return (
		<Root defaultValue="signup">
			<List>
				<Trigger
					onFocus={() => {
						dispatch(resetError());
					}}
					value="signup"
					autoFocus
				>
					Sign Up
				</Trigger>
				<Trigger
					onFocus={() => {
						dispatch(resetError());
					}}
					value="login"
				>
					Login
				</Trigger>
			</List>
			<Content value="signup">
				<SignUp />
			</Content>
			<Content value="login">
				<Login />
			</Content>
		</Root>
	);
};

const Root = styled(motion(Tabs.Root))(
	({ theme }) => `
  background: rgb(${theme.color.secondary.accent});
  display: flex;
  flex-direction: column;
  flex 0 1 fit-content;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.1rem rgb(${theme.color.secondary.light}), 0 0 1rem 0.1rem rgb(${theme.color.secondary.light}) inset;
`
);

const List = styled(motion(Tabs.List))(
	({ theme }) => `
   ${theme.mixins.flex.flxCntrCntr}
`
);

const Trigger = styled(motion(Tabs.Trigger))(
	({ theme }) => `
  ${theme.mixins.flex.flxCntrCntr}

  color: rgb(${theme.color.secondary.dark});
  text-shadow: ${theme.font.shadow.medium};
  font-family: ${theme.font.style.flower};
	font-weight: 900;
  font-size: 4rem;
  flex-grow: 1;
  padding: 1.5rem;

  &[data-state='inactive'] {
    box-shadow: 0 0 0.5rem 0.1rem rgb(${theme.color.secondary.light}), 0 0 1rem 0.1rem rgb(${theme.color.secondary.light}) inset;
  }
`
);

const Content = styled(motion(Tabs.Content))(
	({ theme }) => `
  height: fit-content;
  padding: 1rem;
`
);

export default LoginOrSignUp;
