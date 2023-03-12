import express from "express";
import mongoose from "mongoose";
import "dotenv/config"; //needs to be in this format or will have missing env variables
import env from "./utils/validateEnv";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

mongoose
	.connect(env.MONGO_URL)
	.then(() => {
		console.log("Mongoose Connected");
		app.listen(env.PORT, () => {
			console.log("server started" + env.PORT);
		});
	})
	.catch(console.error);
