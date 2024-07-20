import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ColourCard from "./ColourCard";
import { Note as NoteType } from "./../Services/NoteServices";
import "./../Styles/addNote.scss";

interface AddNoteProps {
  newNote: NoteType;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddNote: (note: NoteType) => void;
  colorNote?: (noteId: number, color: string) => void;
  archiveNote?: (noteId: number) => void;
  trashNote?: (noteId: number) => void;
}

const AddNote: React.FC<AddNoteProps> = ({
  newNote,
  onTitleChange,
  onTextChange,
  onAddNote,
  trashNote = () => {}
}) => {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [colorCardVisible, setColorCardVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF"); // Default white color
  const [isArchived, setIsArchived] = useState<boolean>(false); // New state for archive flag
  const addNoteRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLDivElement>(null);

  const toggleAddNote = () => {
    setIsAddNoteOpen(!isAddNoteOpen);
  };

  const toggleCloseAddNote = () => {
    if (newNote.title || newNote.description) {
      handleAddNote();
    }
    setIsAddNoteOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      addNoteRef.current &&
      !addNoteRef.current.contains(event.target as Node)
    ) {
      setIsAddNoteOpen(false);
    }
    if (
      colorButtonRef.current &&
      !colorButtonRef.current.contains(event.target as Node)
    ) {
      setColorCardVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorButtonClick = () => {
    setColorCardVisible(!colorCardVisible);
  };

  const handleColorSelection = (color: string) => {
    console.log("color selected");
    setSelectedColor(color);
    setColorCardVisible(false);
  };
  const handleAddNote = () => {
    const noteWithColor = { ...newNote, color: selectedColor, isArchived }; // Include isArchived flag
    onAddNote(noteWithColor);
    setSelectedColor("#FFFFFF"); // Reset to default color after adding the note
  };

  const handleArchiveNote = () => {
    setIsArchived(true); // Set the note to be archived
    toggleCloseAddNote(); // Close the add note form and add the note
  };

  const handleTrashNote = () => {
    const tempNoteId = new Date().getTime();
    trashNote(tempNoteId);
    setIsAddNoteOpen(false);
  };

  return (
    <div ref={addNoteRef} className="add-note" style={{ backgroundColor: selectedColor }}>
      {isAddNoteOpen ? (
        <>
          <div>
             <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={onTitleChange}
            autoFocus
            style={{ backgroundColor: selectedColor }}
          />
          </div>
          <div>
            <textarea
              placeholder="Take a note..."
              value={newNote.description}
              onChange={onTextChange}
              style={{ backgroundColor: selectedColor }}
          
            />
          </div>

          <div className="AddNotebutton-container-wrapper">
            <div className="AddNotebutton-container">
              <button title="Remind me">
                <AddAlertOutlinedIcon color="primary" fontSize="small" />
              </button>
              <button title="Collaborator">
                <PersonAddAltIcon fontSize="small" />
              </button>
              <div ref={colorButtonRef} className="color-button-container" style={{ marginRight: '2%' }}>
                <button title="Background Options" onClick={handleColorButtonClick}>
                  <PaletteOutlinedIcon fontSize="small" />
                </button>
                {colorCardVisible && (
                  <ColourCard handleColorSelection={handleColorSelection} />
                )}
              </div>
              <button title="Image Upload">
                <ImageOutlinedIcon fontSize="small" />
              </button>
              <button title="Archive" onClick={handleArchiveNote}>
                <ArchiveOutlinedIcon fontSize="small" />
              </button>
              <button title="Delete" onClick={handleTrashNote}>
                <DeleteOutlinedIcon fontSize="small" />
              </button>
            </div>
            <button
             
              className="closeIcon"
              onClick={toggleCloseAddNote}
              style={{ backgroundColor: selectedColor }}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <div className="take-note" onClick={toggleAddNote}>
          Take a note...
        </div>
      )}
    </div>
  );
};

export default AddNote;
