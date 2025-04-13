import React, { useState, useEffect, useRef} from "react";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL =  'https://tcc-be-task6-582441420598.us-central1.run.app';

import '../styles/NoteList.css';


function NoteList({ notes, fetchNotes }) {
    const [editableNotes, setEditableNotes] = useState(notes);


    const titleRefs = useRef([]);
    const contentRefs = useRef([]);
    // Update state lokal saat komponen menerima prop baru
    useEffect(() => {
        setEditableNotes(notes);
    }, [notes]);


    const updateNote = async (id) => {
        const newTitle = titleRefs.current[id].innerText;
        const newContent = contentRefs.current[id].innerText;
        try {
            const response = await fetch(`${API_URL}/updateNote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle, content: newContent }),
            });
            if (response.ok) {
                alert("Note updated successfully");
                fetchNotes();
            }

        } catch (error) {
            alert("Note update failed");
            console.log("Error updating note");
            console.log(error);
        }
    }

    const deleteNote = async (id) => {
        try {
            await fetch(`${API_URL}/deleteNote/${id}`, {
                method: "DELETE",
            });
            alert("Note deleted successfully");
            fetchNotes();
        } catch (error) {
            console.log("Error deleting note");
            console.log(error);
        }
    }

    return (
        <div className="accordion w-100" id="notesAccordion">
            {editableNotes.length > 0 ? (
                editableNotes.map((note, index) => (
                    <div className="accordion-item" key={note.id}>
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#note${index}`}>
                                <h4 className="accordion-title px-3"
                                    ref={(el) => titleRefs.current[note.id] = el}
                                    contentEditable
                                >
                                    {note.title}
                                </h4>
                            </button>
                        </h2>
                        <div id={`note${index}`} className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <p contentEditable
                                    ref={(el) => contentRefs.current[note.id] = el}
                                >
                                    {note.content}
                                </p>
                                <div className="d-flex gap-3">
                                    <button className="btn actionButton" onClick={() => updateNote(note.id)}>Update</button>
                                        <button className="btn btn-outline-danger deleteButton" onClick={() => deleteNote(note.id)}>Delete</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h3 className="text-center mt-3">No notes available</h3>
            )}
        </div>
    );
}

export default NoteList;