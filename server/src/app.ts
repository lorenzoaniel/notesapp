import "dotenv/config"; //needs to be in this format or will have missing env variables
import express, { Request, Response, NextFunction } from "express";
import NoteModel from "./models/note";

const app = express();

app.get("/", async (req, res, next) => {
	//need this for async, non async will auto forward errors
	try {
		// throw Error("test");
		const notes = await NoteModel.find().exec(); //finds notes in database
		res.status(200).json(notes); //sends an OK status and sends data
	} catch (error) {
		next(error); //forwards to next middleware which is
	}
});

//app.use is a middleware, in this case an error handler has to be after get and needs exactly these 4 params, also needed to add ignore since next will not be used until an error pops up
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = "An Unknown Error occurred";
	const statusCode = 500;
	if (error instanceof Error) errorMessage = error.message;
	res.status(statusCode).json({ error: errorMessage }); //server error, error property is built in
});

export default app;
