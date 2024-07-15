import React from "react";
import { Note as NoteType } from "./../Services/NoteServices";
import NoteButtons from "./NoteButtons";
import NoteServices from "./../Services/NoteServices";

export interface NoteProps {
  note: NoteType;
  updateNote?: (id: number, updatedNote: NoteType) => void;
  archiveNote?: (noteId: number) => void;
  trashNote?: (noteId: number) => void;
  unarchiveNote?: (noteId: number) => void;
  isArchivedPage?: boolean;
  colorNote?: (noteId: number, color: string) => void;
}

const Note: React.FC<NoteProps> = ({
  note,
  updateNote = () => {},
  archiveNote = () => {},
  trashNote = () => {},
  unarchiveNote = () => {},
  isArchivedPage = false,
  colorNote = () => {},
}) => {
  const handleBlur = (field: "title" | "description", value: string) => {
    if (note.id !== undefined) {
      updateNote(note.id, { ...note, [field]: value });
    }
  };

  const handleArchiveClick = () => {
    if (note.id !== undefined) {
      archiveNote?.(note.id); // Use optional chaining
    }
  };

  const handleTrashClick = () => {
    if (note.id !== undefined) {
      trashNote?.(note.id); // Use optional chaining
    }
  };

  const handleUnarchiveClick = () => {
    if (note.id !== undefined) {
      unarchiveNote?.(note.id); // Use optional chaining
    }
  };

  const handleColorSelection = (color: string) => {
    if (note.id !== undefined) {
      colorNote?.(note.id, color); // Pass both noteId and color
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
            {note.id !== undefined && (
              <NoteButtons
                noteId={note.id} // Pass note.id as noteId prop to NoteButtons
                archive={handleArchiveClick}
                trash={handleTrashClick}
                unarchive={handleUnarchiveClick}
                isArchivedPage={isArchivedPage}
                colorNote={handleColorSelection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
