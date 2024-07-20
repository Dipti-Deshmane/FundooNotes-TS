import React, { useState, useEffect } from "react";
import NoteServices, { Note as NoteType } from "./../Services/NoteServices";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Header from "./Header";
import Sidebar from "./Sidebar";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import "./../Styles/trash.scss";

const Trash: React.FC = () => {
  const [trashedNotes, setTrashedNotes] = useState<NoteType[]>([]);
  const token = localStorage.getItem("token") || "";
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);


  const fetchTrashNotes = async () => {
    try {
      const response = await NoteServices.fetchTrashNotes(token);
      console.log("Fetched trash notes data:", response);
      const data: NoteType[] = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setTrashedNotes(data);
    } catch (error) {
      console.error("Error fetching trash notes:", error);
    }
  };

  useEffect(() => {
    fetchTrashNotes();
  }, []);

  const handleUnTrash = async (noteId: number) => {
    try {
      await NoteServices.setNoteToUnTrash([noteId], token);
      setTrashedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      console.log("Note is untrashed");
    } catch (error) {
      console.error("Error untrashing note:", error);
    }
  };

  const deleteForever = async (noteId: number) => {
    try {
      await NoteServices.deleteNoteForever([noteId], token);
      setTrashedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      console.log("Note is permanently deleted");
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
 <div className={`trash-notes-container`}>
                {trashedNotes.length === 0 ? (
                  <div className="BackImg">
                    <DeleteOutlinedIcon style={{ fontSize: 120 }} />
                    <p className="noNote">No notes in Trash</p>
                  </div>
                ) : (
                  trashedNotes.map((note) => (
                    <div className="header-card" key={note.id}>
                      <div className="note-card">
                        <div className="card">
                          <div className="note-card-body">
                            <div className="card-title">{note.title}</div>
                            <div className="card-text">{note.description}</div>
                            <div className="button-container-wrapper">
                              <div className="button-container">
                                <button
                                  title="deleteForever"
                                  onClick={() => deleteForever(note.id!)}
                                >
                                  <DeleteForeverIcon fontSize="small" />
                                </button>
                                <button
                                  title="UnTrash"
                                  onClick={() => handleUnTrash(note.id!)}
                                >
                                  <RestoreFromTrashIcon fontSize="small" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))
                )}
           
            </div>
    
     
  );
};

export default Trash;
