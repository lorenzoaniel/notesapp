import createHttpError from "http-errors";
import { RequestHandler } from "express";

export const requiresAuth: RequestHandler = async (req, res, next) => {
	if (req.session.userId) {
		res.header("Access-Control-Allow-Origin", "https://animated-melba-f0cb96.netlify.app");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		next();
	} else {
		next(createHttpError(401, "User not authenticated"));
	}
};

export const authHeaders: RequestHandler = async (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "https://animated-melba-f0cb96.netlify.app");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
};
