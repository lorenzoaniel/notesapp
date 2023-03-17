import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

import { TiPlus } from "react-icons/ti";

interface Props {
	title: string;
	handleClick: () => any;
}

const AddButton: React.FC<Props> = ({ title, handleClick = () => {} }) => {
	const motion_props = {
		whileHover: "whileHover",
		whileTap: "whileTap",
	};

	return (
		<Main {...motion_props} variants={_MotionVariants.Main} onClick={handleClick}>
			{title}{" "}
			<IconWrapper variants={_MotionVariants.IconWrapper}>
				<TiPlus style={icon_style} />
			</IconWrapper>
		</Main>
	);
};

const Main = styled(motion.button)(
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

const IconWrapper = styled(motion.div)(
	({ theme }) => `
	height: 3rem;
  width: 3rem;
`
);

const icon_style = {
	height: "100%",
	width: "100%",
	filter: "drop-shadow(0 0rem 0.2rem rgb(0,0,0,1))",
};

const _MotionVariants = {
	Main: {
		whileHover: {
			scale: 1.1,
		},
		whileTap: {
			scale: 1,
		},
	},
	IconWrapper: {
		whileHover: {
			rotate: 180,
			transition: {
				type: "spring",
			},
		},
		whileTap: {
			rotate: 0,
		},
	},
};

export default AddButton;
