import React, { Suspense, lazy } from "react";
import { ThemeProvider } from "styled-components";
import { Outlet, Route, Routes, useLocation } from "react-router";

import { GlobalStyle } from "./styles/GlobalStyle";
import base from "./styles/themes/base";
import LoginOrSignUp from "./pages/authentication/LoginOrSignUp";
import { AnimatePresence } from "framer-motion";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/home/Home"));
const Privacy = lazy(() => import("./pages/privacy/Privacy"));

const App: React.FC = () => {
	const location = useLocation();
	return (
		<ThemeProvider theme={base}>
			<GlobalStyle />
			<AnimatePresence>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes key={location.pathname} location={location}>
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
							<Route path="loginorsignup" element={<LoginOrSignUp />} />
						</Route>
					</Routes>
				</Suspense>
			</AnimatePresence>
		</ThemeProvider>
	);
};

export default App;
