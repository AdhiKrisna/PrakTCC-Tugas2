import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const API_URL = 'https://tcc-be-task6-582441420598.us-central1.run.app';
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
        <div className="w-100 mt-5 px-5 mb-3">
            <h1 className="text-center fw-bold">Aku Notes</h1>
            <p className="subHeader text-center">Directly Reach the Title and Content To Edit The Note Data </p>
            <NoteForm fetchNotes={fetchNotes} />
            <hr></hr>
            <NoteList notes={notes} fetchNotes={fetchNotes} />
        </div>
    );
};

export default Dashboard;