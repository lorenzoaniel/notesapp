import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../models/user";

interface InitialState {
	user: User;
}

const initialState: InitialState = {
	user: {
		username: "",
		useremail: "",
		userpass: "",
	},
};

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
	const res = await fetch(input, init);
	if (res.ok) {
		return res;
	} else {
		const errBdy = await res.json();
		alert(errBdy.error);
		throw Error(errBdy.error);
	}
};

//grabs users session
export const getLoggedInUser = async (): Promise<User> => {
	const res = await fetchData("/api/users", { method: "GET" });
	return res.json();
};

interface SignUpCreds {
	username: string;
	useremail: string;
	userpass: string;
}

//client will need to input creds
export const signUp = async (credentials: SignUpCreds): Promise<User> => {
	const res = await fetchData("/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	return res.json();
};

interface LoginCreds {
	username: string;
	userpass: string;
}

//
export const login = async (credentials: LoginCreds): Promise<User> => {
	const res = await fetchData("/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	return res.json();
};

export const logout = async () => {
	await fetchData("/api/users/logout", { method: "POST" });
};

export const userApiSlice = createSlice({
	name: "userApiSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export default userApiSlice.reducer;
