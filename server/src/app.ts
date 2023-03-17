import "dotenv/config"; //used to load env vars from env file
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./utils/validateEnv"; //loads env vars and validates values
import MongoStore from "connect-mongo";

//create express instance
const app = express();

app.use(cors());

//defines type and amount of information
app.use(morgan("dev"));

//catches json and enables json POSTS
app.use(express.json());

//in conjunction with userRoutes creates session for each client
app.use(
	session({
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 1000, //in miliseconds this translates to an hour
		},
		rolling: true,
		store: MongoStore.create({
			mongoUrl: env.MONGO_URL, //same as our database
		}),
	})
);

//middleware catches requests going to this endpoint aand forwwards to notesRoutes
app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);

//end point not found error, this one is infered automatically unlike one below, works for normal routes but not error routes
app.use((req, res, next) => {
	//resource not found
	next(createHttpError(404, "This endpoint does not exist"));
});

//error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	//default error message
	let errorMessage = "An Unknown Error occurred";
	//internal server error status fallback
	let statusCode = 500;
	//if error is a known error, or instance of generic Error class replace generic message with a known error message defined in Error class
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	//else it sends the generic errorMessage
	res.status(statusCode).json({ error: errorMessage });
});

export default app;
