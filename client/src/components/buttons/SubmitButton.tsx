import * as Form from "@radix-ui/react-form";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface Props {
	title: string;
	disabled: boolean;
}

const SubmitButton: React.FC<Props> = ({ title, disabled }) => {
	return <Main disabled={disabled}>{title}</Main>;
};

const Main = styled(motion(Form.Submit))(
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

export default SubmitButton;
