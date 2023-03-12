import { InferSchemaType, Schema, model } from "mongoose";

//creates a Schema object
const noteSchema = new Schema(
	{
		title: { type: String, required: true },
		text: { type: String },
	},
	{ timestamps: true } //automatically creates createdAt and updatedAt fields which record when an object is first created and last time it is changed
);

//creates a new type which uses the schema obj above, this describes the shape of the data that can be stored in a collection that uses this schema
type Note = InferSchemaType<typeof noteSchema>;

//exports a mongoose model obj created from noteSchema called 'Note' 1st arg, with a type <Note> this model can be used to perform CRUD on MongoDB collections that store Note objects
export default model<Note>("Note", noteSchema);
