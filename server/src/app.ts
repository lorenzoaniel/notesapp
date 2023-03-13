import "dotenv/config"; //used to load env vars from env file
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";

//create express instance
const app = express();

//catches json and enables json POSTS
app.use(express.json());

//middleware catches requests going to this endpoint aand forwwards to notesRoutes
app.use("/api/notes", notesRoutes);

//end point not found error, this one is infered automatically unlike one below, works for normal routes but not error routes
app.use((req, res, next) => {
	next(Error("endpoint not found"));
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
