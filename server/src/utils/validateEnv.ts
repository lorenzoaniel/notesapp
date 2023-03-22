import { cleanEnv } from "envalid";
import { port, str, url } from "envalid/dist/validators"; //has to be imported this way instead of from 'envalid'

//1st arg contains env vars to be validated, 2nd an obj that defines what env vars should look like
export default cleanEnv(process.env, {
	MONGO_URL: str(), //expected to be a string
	PORT: port(), //expected to be a port number
	SESSION_SECRET: str(),
	ALLOWEDORIGIN: url(),
});

//an error is thrown if validation fails
