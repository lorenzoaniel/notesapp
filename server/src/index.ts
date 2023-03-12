import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateEnv";

const port = env.PORT;

mongoose
	.connect(env.MONGO_URL)
	.then(() => {
		console.log("Mongoose Connected");
		app.listen(port, () => {
			console.log("server started " + port);
		});
	})
	.catch(console.error);
