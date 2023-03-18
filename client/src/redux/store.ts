import { noteApiSlice } from "./features/noteApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./features/userApiSlice";

export const store = configureStore({
	reducer: {
		noteApiSlice: noteApiSlice.reducer,
		userApiSlice: userApiSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
