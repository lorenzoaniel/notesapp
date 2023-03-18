import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TypeNote, NoteUpdate } from "../../models/note";

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

export const fetchNotes = createAsyncThunk("noteApiSlice/fetchNotes", async () => {
	const res = await fetchData("http://localhost:5000/api/notes", {
		method: "GET",
	});
	return await res.json();
});

export const createNote = createAsyncThunk("noteApiSlice/createNote", async () => {
	const res = await fetchData("http://localhost:5000/api/notes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: "No Title", text: "No Text" }),
	});
	return await res.json();
});

export const deleteNote = createAsyncThunk("noteApiSlice/deleteNote", async (noteId: string) => {
	const res = await fetchData(`http://localhost:5000/api/notes/${noteId}`, { method: "DELETE" });
	return await res.json();
});

export const updateNote = createAsyncThunk("noteApiSlice/updateNote", async (note: NoteUpdate) => {
	const res = await fetchData(`http://localhost:5000/api/notes/${note._id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: note.title, text: note.text }),
	});
	return await res.json();
});

interface InitialState {
	notes: TypeNote[];
}

const initialState: InitialState = {
	notes: [],
};

export const noteApiSlice = createSlice({
	name: "noteApiSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotes.fulfilled, (state, action) => {
				//will loop if not checking payload and local note state for equality
				if (action.payload && JSON.stringify(action.payload) !== JSON.stringify(state.notes)) {
					state.notes = action.payload; //will sometimes get no payload since mongo has not received any changes
				}
			})
			.addCase(createNote.fulfilled, (state, action) => {
				if (action.payload) state.notes.push(action.payload);
			})
			.addCase(deleteNote.fulfilled, () => {})
			.addCase(updateNote.fulfilled, (state, action) => {
				const updatedIndex = state.notes.findIndex(
					(currNote) => currNote._id === action.payload._id
				);
				if (updatedIndex > -1) state.notes[updatedIndex] = action.payload;
			});
	},
});

// Other code such as selectors can use the imported `RootState` type
export const selectNoteApi = (state: RootState) => state.noteApiSlice.notes;

export default noteApiSlice.reducer;
