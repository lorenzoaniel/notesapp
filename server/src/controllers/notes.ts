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
