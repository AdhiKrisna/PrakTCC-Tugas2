import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);


const Dashboard = () => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/notes`);
            const data = await response.json();
            if (data.success) {
                setNotes(data.notes);
            }
        }
        catch (error) {
            console.log("Error fetching notes data");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="w-100 px-5">
            <h1 className="text-center fw-bold">Aku Notes</h1>
            <h5 className="text-center fw-bold">Directly Reach the Title and Content To Edit The Text </h5>
            <NoteForm fetchNotes={fetchNotes} />
            <NoteList notes={notes} fetchNotes={fetchNotes} />
        </div>
    );
};

export default Dashboard;