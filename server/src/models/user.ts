import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	useremail: { type: String, required: true, unique: true, select: false }, //select means retrieve user from database this will not return this, and we will have to request manually
	userpass: { type: String, required: true, select: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
