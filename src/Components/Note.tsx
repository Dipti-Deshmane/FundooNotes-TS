import React from "react";
import { Note as NoteType } from "./../Services/NoteServices";
import NoteButtons from "./NoteButtons";

export interface NoteProps {
  note: NoteType;
  updateNote?: (id: number, updatedNote: NoteType) => void;
  archiveNote?: (noteId: number) => void;
  trashNote?: (noteId: number) => void;
  unarchiveNote?: (noteId: number) => void; // Add this prop
  isArchivedPage?: boolean; // Add this prop

}

const Note: React.FC<NoteProps> = ({ note, updateNote = () => {}, archiveNote = () => {}, trashNote = () => {},unarchiveNote = () => {},isArchivedPage = false // Default to false
}) => {
  
  const handleBlur = (field: "title" | "description", value: string) => {
    if (note.id !== undefined) {
      updateNote(note.id, { ...note, [field]: value });
    }
  };

  const handleArchiveClick = () => {
    if (note.id !== undefined) {
      archiveNote(note.id);
    }
  };

  const handleTrashClick = () => {
    if (note.id !== undefined) {
      trashNote(note.id);
    }
  };
  const handleUnarchiveClick = () => {
    if (note.id !== undefined) {
      unarchiveNote(note.id);
    }
  };

  return (
    <div className="header-card">
      <div className="note-card">
        <div className="card">
          <div className="note-card-body">
            <div
              className="card-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlur("title", e.currentTarget.innerText)}
            >
              {note.title}
            </div>
            <div
              className="card-text"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlur("description", e.currentTarget.innerText)}
            >
              {note.description}
            </div>
            <NoteButtons archive={handleArchiveClick} trash={handleTrashClick} unarchive={handleUnarchiveClick} // Pass this prop
              isArchivedPage={isArchivedPage} // Pass this prop
           />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
