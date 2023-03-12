import express from "express";
import * as NotesController from "../controllers/notes";

const router = express();

//express route handler responds to HTTP GET req to root URL '/'
router.get("/", NotesController.getNotes);

export default router;
