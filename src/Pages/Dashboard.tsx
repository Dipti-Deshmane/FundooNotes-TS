import React, { useState, useEffect, ChangeEvent } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Note from "../Components/Note";
import AddNote from "../Components/AddNote";
import NoteServices, { Note as NoteType } from "./../Services/NoteServices";
import NoteButtons from "../Components/NoteButtons";

interface DashboardProps {
  note?: NoteType;
  updateColor?: (color: string, id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState({
    title: "",
    description: ""
  });
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleNoteTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote({ ...newNote, description: e.target.value });
  };

  const fetchNotes = async () => {
    try {
      const response = await NoteServices.fetchNotes(token);
      console.log("Fetched notes data:", response); // Log the fetched data
     const data: NoteType[] = Array.isArray(response.data.data) ? response.data.data : [];
      const filteredNotes = data.filter((note: NoteType) => !note.isArchived && !note.isDeleted);
      setNotes(filteredNotes);
      console.log("Filtered notes set to state:", filteredNotes); // Log the filtered notes
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (newNote.title.trim() !== "" || newNote.description.trim() !== "") {
      try {
        await NoteServices.addNote({ ...newNote }, token);
        console.log("Successfully added");
        fetchNotes();
        setNewNote({ title: "", description: "" });
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  return (
    <div className="note-dashboard">
      <div className="App">
        <Header toggleSidebar={toggleMenubar} />
        <div className="main">
          <Sidebar isClosed={isMenuSidebar} />
          <div className="notes-container">
            <AddNote
              newNote={newNote}
              onTitleChange={handleNoteTitleChange}
              onTextChange={handleNoteTextChange}
              onAddNote={addNote}
            />
            {/* Displaying notes */}
            <div className="pinned-notes-container">
              {notes.length === 0 ? (
                <p>No notes available</p>
              ) : (
                notes.map((note) => (
                  <Note key={note.id} note={note} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
