import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

//express route handler responds to HTTP GET req to root URL '/'
router.get("/", NotesController.getNotes);

//same endpoint since different HTTP type, this one sends a note to the collection
router.post("/", NotesController.createNotes);

//base url plus noteId param that is then used in controller passed to it
router.get("/:noteId", NotesController.getNote);

//delete
router.delete("/:noteId", NotesController.deleteNote);

//update
router.patch("/:noteId", NotesController.updateNote);

export default router;
