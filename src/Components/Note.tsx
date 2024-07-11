import React from "react";
import { Note as NoteType } from "./../Services/NoteServices";
import NoteButtons from "./NoteButtons";

interface NoteProps {
  note: NoteType;
}

const Note: React.FC<NoteProps> = ({ note }) => {

  return (
    <div className="header-card">
      <div className="note-card">
        <div className="card">
          <div className="note-card-body">
            <div className="card-title">{note.title}</div>
            <div className="card-text">{note.description}</div>
            <NoteButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
