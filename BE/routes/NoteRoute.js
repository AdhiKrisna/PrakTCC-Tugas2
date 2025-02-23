import express from "express"
import {getNotes, addNotes, updateNotes, deleteNotes} from "../controllers/NoteController.js"

const router = express.Router()

router.get("/notes", getNotes)
router.post("/addNote", addNotes)
router.put("/updateNote/:id", updateNotes)
router.delete("/deleteNote/:id", deleteNotes)


export default router