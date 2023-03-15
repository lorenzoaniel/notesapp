import React from "react";
import { ThemeProvider } from "styled-components";
import { Outlet, Route, Routes } from "react-router";

import { GlobalStyle } from "./styles/GlobalStyle";
import base from "./styles/themes/base";

import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Privacy from "./pages/privacy/Privacy";
import { AnimatePresence } from "framer-motion";

const App: React.FC = () => {
	return (
		<ThemeProvider theme={base}>
			<GlobalStyle />
			<AnimatePresence>
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<Outlet />
							</Layout>
						}
					>
						<Route index element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="privacy" element={<Privacy />} />
					</Route>
				</Routes>
			</AnimatePresence>
		</ThemeProvider>
	);
};

export default App;
