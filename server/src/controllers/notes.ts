import mongoose from "mongoose";
import createHttpError from "http-errors";
import { RequestHandler } from "express";
import NoteModel from "../models/note";

//instead of
export const getNotes: RequestHandler = async (req, res, next) => {
	try {
		//this route handler then uses NoteModel to find all related obj that fits this schema and send them back as a JSON array
		const notes = await NoteModel.find().exec();

		//this array is sent back as a res stat 200 which means OK
		res.status(200).json(notes);
	} catch (error) {
		// if there is an error it is passed on an error-handling MIDDLEWARE func
		next(error);
	}
};

interface CreateNoteBody {
	//even if it is required there might be an instance where title is missing we want to handle that in the requesthandler and not throw a different error here
	title?: string;
	text?: string;
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (
	req,
	res,
	next
) => {
	const title = req.body.title;
	const text = req.body.text;

	try {
		//400 bad request since title is missing
		if (!title) throw createHttpError(400, "Note must have a title");

		//send new note to client and DB, similar to .find() but .create() auto returns a promise by default so no need for .exec()
		const newNote = await NoteModel.create({
			title: title,
			text: text,
		});

		//response sent back to client
		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};

export const getNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId; //same spelling as notes route since params will take values in url ex: notes/:noteId <- this will be replaced by a note id in client side and then retrieved by backend (probably a list of all notes saved in client side)

	try {
		if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid note id");

		const note = await NoteModel.findById(noteId).exec();

		if (!note) throw createHttpError(404, "note not found");

		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};
