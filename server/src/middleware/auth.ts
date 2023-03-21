import createHttpError from "http-errors";
import { RequestHandler } from "express";

export const requiresAuth: RequestHandler = async (req, res, next) => {
	const authenicatedUserId = req.session.userId;

	if (req.session.userId) {
		next();
	} else {
		next(createHttpError(401, "user not authenticated"));
	}
};
