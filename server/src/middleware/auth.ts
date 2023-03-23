import createHttpError from "http-errors";
import { RequestHandler } from "express";

export const requiresAuth: RequestHandler = async (req, res, next) => {
	if (req.session.userId) {
		res.setHeader("Access-Control-Allow-Credentials", "true");
		next();
	} else {
		next(createHttpError(401, "User not authenticated"));
	}
};
