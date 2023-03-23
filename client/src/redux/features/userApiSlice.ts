import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../models/user";
import { fetchData } from "../../utils/fetchData";

const URL = "https://portfolionotesapp.onrender.com";

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

//grabs users session
export const getLoggedInUser = createAsyncThunk(
	"userApiSlice/getLoggedInUser",
	async (): Promise<User> => {
		const res = await fetchData(`${URL}/api/users`, { method: "GET" });
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
		const res = await fetchData(`${URL}/api/users/signup`, {
			method: "POST",
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
		const res = await fetchData(`${URL}/api/users/login`, {
			method: "POST",
			body: JSON.stringify(credentials),
		});
		return res.json();
	}
);

export const logout = createAsyncThunk("userApiSlice/logout", async () => {
	await fetchData(`${URL}/api/users/logout`, { method: "POST" });
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
