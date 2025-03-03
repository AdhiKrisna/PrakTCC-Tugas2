import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function NoteList({ notes, fetchNotes }) {
    const [editableNotes, setEditableNotes] = useState(notes);

    // Update state lokal saat komponen menerima prop baru
    useEffect(() => {
        setEditableNotes(notes);
    }, [notes]);


    const updateNote = async (id, newTitle, newContent) => {
        try {
            await fetch(`${API_URL}/updateNote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle, content: newContent }),
            });
            fetchNotes();
        } catch (error) {
            console.log("Error updating note");
            console.log(error);
        }
    }

    const deleteNote = async (id) => {
        try {
            await fetch(`${API_URL}/deleteNote/${id}`, {
                method: "DELETE",
            });
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
                                    <h4 className="accordion-title"
                                        contentEditable
                                        onBlur={(e) => updateNote(note.id, e.target.innerText, note.content)}
                                    >
                                        {note.title}
                                    </h4>
                                </button>
                            </h2>
                            <div id={`note${index}`} className="accordion-collapse collapse">
                                <div className="accordion-body">
                                    <p   contentEditable
                                        onBlur={(e) => updateNote(note.id, note.title, e.target.innerText)}
                                    >
                                        {note.content}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn deleteNoteButton" onClick={() => deleteNote(note.id)}>Delete</button>
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