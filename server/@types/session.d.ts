//type definition files
import mongoose from "mongoose";

declare module "express-session" {
	//have to use this exact name since it is same in package
	interface SessionData {
		userId: mongoose.Types.ObjectId;
	}
}
