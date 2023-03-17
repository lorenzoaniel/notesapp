import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

import { device } from "../../styles/breakpoints";

import { BsFlower2 } from "react-icons/bs";

interface Props {
	children: React.ReactNode;
	className?: string;
}

const Item: React.FC<Props> = ({ children, className }) => {
	const motion_props = {
		initial: "initial",
		whileHover: "whileHover",
		whileTap: "whileTap",
	};

	return (
		<Main variants={_MotionVariants.Main} {...motion_props} className={className}>
			<IconWrapper variants={_MotionVariants.IconWrapper} custom={20}>
				<BsFlower2 style={icon_style} />
			</IconWrapper>
			<IconWrapper variants={_MotionVariants.IconWrapper} custom={40}>
				<BsFlower2 style={icon_style} />
			</IconWrapper>
			<IconWrapper variants={_MotionVariants.IconWrapper} custom={60}>
				<BsFlower2 style={icon_style} />
			</IconWrapper>
			<IconWrapper variants={_MotionVariants.IconWrapper} custom={80}>
				<BsFlower2 style={icon_style} />
			</IconWrapper>
			<IconWrapper variants={_MotionVariants.IconWrapper} custom={100}>
				<BsFlower2 style={icon_style} />
			</IconWrapper>
			{children}
		</Main>
	);
};

const Main = styled(motion(NavigationMenu.Item))(
	({ theme }) => `
	display: flex;
  position: relative;
  // background: red;
  overflow: hidden;

  * {
    z-index: 2;
  }

	&:nth-child(1), &:nth-child(2) {
		flex-grow: 5;
	}

  &:hover {
    cursor: pointer;
  }

	@media ${device.tablet} {
		&:nth-child(1), &:nth-child(2) {
			flex-grow: 1;
		}
	}
`
);

const IconWrapper = styled(motion.div)(
	({ theme, custom }) => `
	position: absolute;
  z-index: 1;
  right: ${custom}%;
  top: ${custom / 2}%;
  color: rgb(${theme.color.secondary.accent});
`
);

const icon_style = {
	height: "100%",
	width: "100%",
	filter: "drop-shadow(0 0rem 0.2rem rgb(0,0,0,1))",
};

const _MotionVariants = {
	Main: {
		initial: {
			scale: 1,
		},
		whileHover: {
			scale: 1.2,
			transition: {
				staggerChildren: 0.1,
				ease: "easeInOut",
			},
		},
		whileTap: {
			scale: 1,
			transition: {
				duration: 0.1,
				staggerChildren: 0.1,
				ease: "easeInOut",
			},
		},
	},
	IconWrapper: {
		initial: {
			opacity: 0,
		},
		whileHover: {
			opacity: 1,
			transition: {
				ease: "easeInOut",
			},
		},
		whileTap: {
			opacity: 0,
		},
	},
};

export default Item;
