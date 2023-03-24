import React, { Suspense, lazy, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Navigate, Outlet, Route, Routes, redirect, useLocation } from "react-router";

import { GlobalStyle } from "./styles/GlobalStyle";
import base from "./styles/themes/base";
import LoginOrSignUp from "./pages/authentication/LoginOrSignUp";
import { AnimatePresence } from "framer-motion";
import { getLoggedInUser, selectUserApi } from "./redux/features/userApiSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Loading from "./pages/Loading/Loading";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/home/Home"));
const Privacy = lazy(() => import("./pages/privacy/Privacy"));

const App: React.FC = () => {
	const user = useAppSelector(selectUserApi).user;
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const auth = async () => {
			try {
				await dispatch(getLoggedInUser());
			} catch (error) {
				console.log(error);
			}
		};
		auth();
	}, []);

	return (
		<ThemeProvider theme={base}>
			<GlobalStyle />

			<Suspense fallback={<Loading />}>
				<Routes key={location.pathname} location={location}>
					<Route
						path="/"
						element={
							<Layout>
								<AnimatePresence mode="wait">
									<Outlet />
								</AnimatePresence>
							</Layout>
						}
					>
						<Route index element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="privacy" element={<Privacy />} />
						<Route
							path="loginorsignup"
							element={user.username ? <Navigate to={`/home`} replace={true} /> : <LoginOrSignUp />}
						/>
						<Route path="*" element={<Home />} />
					</Route>
				</Routes>
			</Suspense>
		</ThemeProvider>
	);
};

export default App;
