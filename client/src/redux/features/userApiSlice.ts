import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../models/user";
import { ConflictError, UnauthorizedError } from "../../errors/http_error";

interface InitialState {
	user: User;
	errors: any;
}

const initialState: InitialState = {
	user: {
		username: null,
		useremail: null,
	},
	errors: undefined,
};

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
	//credentials: "include"
	const response = await fetch(input, { ...init });
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.error;
		if (response.status === 401) {
			throw new UnauthorizedError(errorMessage);
		} else if (response.status === 409) {
			throw new ConflictError(errorMessage);
		} else {
			throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
		}
	}
};

//grabs users session
export const getLoggedInUser = createAsyncThunk(
	"userApiSlice/getLoggedInUser",
	async (): Promise<User> => {
		const res = await fetchData("/api/users", { method: "GET" });
		return res.json();
	}
);

interface SignUpCreds {
	username: string;
	useremail: string;
	userpass: string;
}

//client will need to input creds
export const signUp = createAsyncThunk(
	"userApiSlice/signUp",
	async (credentials: SignUpCreds): Promise<User> => {
		const res = await fetchData("/api/users/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});
		return res.json();
	}
);

interface LoginCreds {
	username: string;
	userpass: string;
}

//
export const login = createAsyncThunk(
	"userApiSlice/login",
	async (credentials: LoginCreds): Promise<User> => {
		const res = await fetchData("/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});
		return res.json();
	}
);

export const logout = createAsyncThunk("userApiSlice/logout", async () => {
	await fetchData("/api/users/logout", { method: "POST" });
});

export const userApiSlice = createSlice({
	name: "userApiSlice",
	initialState,
	reducers: {
		resetError: (state) => {
			state.errors = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getLoggedInUser.fulfilled, (state, action) => {
				if (action.payload) {
					state.user = { username: action.payload.username, useremail: action.payload.useremail };
				}
			})
			.addCase(signUp.fulfilled, (state, action) => {
				if (action.payload) {
					state.user = { username: action.payload.username, useremail: action.payload.useremail };
				}
			})
			.addCase(signUp.rejected, (state, action) => {
				console.log(action.error);
				state.errors = action.error;
			})
			.addCase(login.fulfilled, (state, action) => {
				if (action.payload) {
					state.user = { username: action.payload.username, useremail: action.payload.useremail };
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.errors = action.error;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = {
					username: null,
					useremail: null,
				};
			});
	},
});

export const { resetError } = userApiSlice.actions;
export const selectUserApi = (state: RootState) => state.userApiSlice;

export default userApiSlice.reducer;
