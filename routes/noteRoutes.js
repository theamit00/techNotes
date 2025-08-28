import express from "express";
import {createNote, deleteNote, getAllNotes, updateNote} from "../controllers/noteControllers.js";
const router = express.Router();

router.get('/', getAllNotes);

router.post('/new', createNote);

router.put('/:id/edit', updateNote);

router.delete('/:id/delete', deleteNote);

export default router;