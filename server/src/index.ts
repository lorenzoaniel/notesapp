import app from "./app"; //express
import mongoose from "mongoose"; //MongoDb obj modelling tool
import env from "./utils/validateEnv"; //loads env vars and validates values

const port = env.PORT;

mongoose
	.connect(env.MONGO_URL) //attemps a connection
	//if successful
	.then(() => {
		console.log("Mongoose Connected");
		//starts up express in specified port
		app.listen(port, () => {
			console.log("server started " + port);
		});
	})
	//if failed
	.catch(console.error);
