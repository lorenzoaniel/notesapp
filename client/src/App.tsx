import React, { Suspense, lazy } from "react";
import { ThemeProvider } from "styled-components";
import { Outlet, Route, Routes } from "react-router";

import { GlobalStyle } from "./styles/GlobalStyle";
import base from "./styles/themes/base";

// import Layout from "./components/Layout";
// import Home from "./pages/home/Home";
// import Privacy from "./pages/privacy/Privacy";
// import { AnimatePresence } from "framer-motion";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/home/Home"));
const Privacy = lazy(() => import("./pages/privacy/Privacy"));

const App: React.FC = () => {
	return (
		<ThemeProvider theme={base}>
			<GlobalStyle />
			{/* <AnimatePresence mode="wait"> */}
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<Outlet />
							</Layout>
						}
					>
						<Route index element={<Privacy />} />
						<Route path="home" element={<Home />} />
						<Route path="privacy" element={<Privacy />} />
					</Route>
				</Routes>
			</Suspense>
			{/* </AnimatePresence> */}
		</ThemeProvider>
	);
};

export default App;
