document.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:5000";
    const accordionContainer = document.getElementById("notesAccordion");
    const addNoteButton = document.getElementById("addNoteBtn");
    const noteTitle = document.getElementById("noteTitleInput");
    const noteContent = document.getElementById("noteContentInput");
    //fetch notes data
    async function fetchNotes() {
        try {
            const response = await fetch(`${url}/notes`);
            const notesData = await response.json();

            if (notesData.success && notesData.notes.length > 0) {
                console.log(notesData.notes);
                accordionContainer.innerHTML = "";

                notesData.notes.forEach((note, index) => {
                    // Header
                    const accordionItem = document.createElement("div");
                    accordionItem.className = "accordion-item";
                    const accordionHeader = document.createElement("h2");
                    accordionHeader.className = "accordion-header";
                    const accordionButton = document.createElement("button");
                    accordionButton.className = "accordion-button collapsed";
                    accordionButton.type = "button";
                    accordionButton.setAttribute("data-bs-toggle", "collapse");
                    accordionButton.setAttribute("data-bs-target", `#note${index}`);
                    accordionButton.setAttribute("aria-expanded", "false");
                    accordionButton.setAttribute("aria-controls", `note${index}`);
                    const titleNote = document.createElement("h4");
                    titleNote.contentEditable = "true";
                    titleNote.innerText = note.title;

                    // edit title
                    titleNote.addEventListener("blur", async () => {
                        await updateNote(note.id, titleNote.innerText, note.content);
                    });
                    accordionButton.appendChild(titleNote);
                    accordionHeader.appendChild(accordionButton);

                    // Body
                    const collapseDiv = document.createElement("div");
                    collapseDiv.id = `note${index}`;
                    collapseDiv.className = "accordion-collapse collapse";
                    // collapseDiv.setAttribute("data-bs-parent", "#notesAccordion"); // uncoment this line if you want to make the accordion only open one at a time
                    const accordionBody = document.createElement("div");
                    accordionBody.className = "accordion-body";
                    const contentSpan = document.createElement("span");
                    contentSpan.className = "content-span";
                    contentSpan.contentEditable = "true";
                    contentSpan.innerText = note.content;
                    contentSpan.style.fontSize = "1.2em";
                    //  edit content
                    contentSpan.addEventListener("blur", async () => {
                        await updateNote(note.id, note.title, contentSpan.innerText);
                    });

                    const deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    // delete note
                    deleteButton.addEventListener("click", async () => {
                        await deleteNote(note.id);
                        fetchNotes();
                    });
                    deleteButton.className = "btn btn-danger ms-3 mb-2";
                    deleteButton.textContent = "Delete";


                    // merge elements
                    accordionBody.appendChild(contentSpan);
                    collapseDiv.appendChild(accordionBody);
                    collapseDiv.appendChild(deleteButton);
                    accordionItem.appendChild(accordionHeader);
                    accordionItem.appendChild(collapseDiv);

                    accordionContainer.appendChild(accordionItem);
                });
            }
            else {
                accordionContainer.innerHTML = "";
                const emptyNote = document.createElement("h1");
                emptyNote.className = "empty-note";
                emptyNote.innerText = "No notes available";
                accordionContainer.appendChild(emptyNote);
                accordionContainer.style.textAlign = "center";
            }
        }
        catch (error) {
            console.log("Error fetching notes data");
            console.log(error);
        }
    }

    // Add new note
    addNoteButton.addEventListener("click", async () => {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();

        if (title === "" || content === "") {
            alert("Title and content cannot be empty");
            return;
        }

        const newNote = {
            title,
            content
        };
        try {
            const response = await fetch(`${url}/addNote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newNote)
            });

            const result = await response.json();
            if (result.success) {
                alert("New note added successfully!");
                noteTitle.value = "";
                noteContent.value = "";
                fetchNotes();
            }
            else {
                alert("Failed to add new note");
            }

        } catch (error) {
            alert("Failed to add new note :(");
            console.log("Error adding new note");
            console.log(error);
        }
    });

    //update note
    async function updateNote(id, newTitle, newContent) {
        try {
            const response = await fetch(`${url}/updateNote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newTitle,
                    content: newContent,
                }),
            });

            const result = await response.json();
            if (result.success) {
                console.log("Note updated successfully!");
            } else {
                alert("Failed to update note");
            }
        } catch (error) {
            alert("Failed to update note :(");
            console.error("Error updating note:", error);
        }
    }

    async function deleteNote(id) {
        try {
            const response = await fetch(`${url}/deleteNote/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();
            if (result.success) {
                alert("Note deleted successfully!");
                console.log("Note deleted successfully!");
            } else {
                alert("Failed to delete note");
                console.error("Failed to delete note");
            }
        } catch (error) {
            alert("Failed to delete note :(");
            console.error("Error deleting note:", error);
        }
    }


    fetchNotes();

});
