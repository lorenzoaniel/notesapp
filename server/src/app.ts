import "dotenv/config"; //used to load env vars from env file
import express, { Request, Response, NextFunction } from "express";
import NoteModel from "./models/note";

//create express instance
const app = express();

//express route handler responds to HTTP GET req to root URL '/'
app.get("/", async (req, res, next) => {
	try {
		//this route handler then uses NoteModel to find all related obj that fits this schema and send them back as a JSON array
		const notes = await NoteModel.find().exec();
		//this array is sent back as a res stat 200 which means OK
		res.status(200).json(notes);
	} catch (error) {
		// if there is an error it is passed on an error-handling MIDDLEWARE func
		next(error);
	}
});

//error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	//default error message
	let errorMessage = "An Unknown Error occurred";
	//server error status
	const statusCode = 500;
	//if error is a known error, or instance of generic Error class replace generic message with a known error message defined in Error class
	if (error instanceof Error) errorMessage = error.message;
	//else it sends the generic errorMessage
	res.status(statusCode).json({ error: errorMessage });
});

export default app;
