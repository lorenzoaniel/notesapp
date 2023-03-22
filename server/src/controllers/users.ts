import createHttpError from "http-errors";
import { RequestHandler } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

/*
	LOGIN @@@@@@@@@@@@@@@@@ 
*/

export const getAuthUser: RequestHandler = async (req, res, next) => {
	try {
		//once we have verified that there is still an active session id since it is still in database we can grab
		const user = await UserModel.findById(req.session.userId).select("+useremail").exec();
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

interface SignUpBody {
	username?: string;
	useremail?: string;
	userpass?: string;
}

/*
	SIGNUP @@@@@@@@@@@@@@@@@ 
*/

//params in RequestHandler: route, response body, request body, request query(URL)
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (
	req,
	res,
	next
) => {
	const username = req.body.username;
	const useremail = req.body.useremail;
	const passRaw = req.body.userpass;

	try {
		//checks for any empty
		if (!username || !useremail || !passRaw) {
			throw createHttpError(400, "Parameters missing");
		}

		//checks for existing username
		const existingUsername = await UserModel.findOne({ username: username }).exec();
		if (existingUsername) {
			throw createHttpError(409, "Username Already Taken!");
		}

		//checks for existing useremail
		const existingUseremail = await UserModel.findOne({ useremail: useremail }).exec();
		if (existingUseremail) {
			throw createHttpError(409, "Email Already Used!");
		}

		//hash raw pass
		const passHash = await bcrypt.hash(passRaw, 10);

		//send values collected into a new document
		const newUser = await UserModel.create({
			username: username,
			useremail: useremail,
			userpass: passHash,
		});

		req.session.userId = newUser._id;

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

/*
	LOGIN @@@@@@@@@@@@@@@@@ 
*/

interface LoginBody {
	username?: string;
	userpass?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (
	req,
	res,
	next
) => {
	const username = req.body.username;
	const userpass = req.body.userpass;

	try {
		if (!username || !userpass) {
			throw createHttpError(400, "Missing Parameters Login");
		}

		//since we set this as false in model by default we have to manually ask to include these when asking for the particular username
		const user = await UserModel.findOne({ username: username })
			.select("+userpass +useremail")
			.exec();

		if (!user) {
			//do not onclude error message letting attackers know which parameter is incorrect or missing just generalize
			throw createHttpError(401, "Invalid credentials");
		}

		//compares user typed pass with stored hash
		const passMatch = await bcrypt.compare(userpass, user.userpass);

		if (!passMatch) {
			//do not onclude error message letting attackers know which parameter is incorrect or missing just generalize
			throw createHttpError(401, "Invalid credentials");
		}

		//if successful for all checks establish session
		req.session.userId = user._id;
		//return res for front-end (201 means created btw)

		// Set a cookie with the user ID

		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

/*
	LOGOUT @@@@@@@@@@@@@@@@@ 
*/

export const logout: RequestHandler = async (req, res, next) => {
	//not a promise but uses callback
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			//nothing to send must use sendStatus
			res.sendStatus(200);
		}
	});
};
