import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { motion } from "framer-motion";
import Login from "../../components/form/Login";
import SignUp from "../../components/form/SignUp";

const LoginOrSignUp = () => {
	return (
		<Root defaultValue="signup">
			<List>
				<Trigger value="signup">Sign Up</Trigger>
				<Trigger value="login">Login</Trigger>
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
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.1rem rgb(${theme.color.secondary.light}), 0 0 1rem 0.1rem rgb(${theme.color.secondary.light}) inset;
`
);

const List = styled(motion(Tabs.List))(
	({ theme }) => `
   ${theme.mixins.flex.flxCntrCntr}
   gap: 20%;
   padding: 1.5rem;
`
);

const Trigger = styled(motion(Tabs.Trigger))(
	({ theme }) => `
  color: rgb(${theme.color.secondary.dark});
  text-shadow: ${theme.font.shadow.medium};
  font-family: ${theme.font.style.flower};
	font-weight: 900;
  font-size: 4rem;
`
);

const Content = styled(motion(Tabs.Content))(
	({ theme }) => `
  min-height: 50rem;
`
);

export default LoginOrSignUp;
