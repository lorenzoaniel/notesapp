import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Home: React.FC = () => {
	return <Main>home</Main>;
};

const Main = styled(motion.nav)`
	border: 0.1rem solid purple;
	height: 10vh;
`;

export default Home;
