import React, { useState, useEffect, useRef } from 'react';
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./../Styles/dashboard.scss";
import { Card } from 'reactstrap';
import "./../Styles/noteButton.scss";
import ColourCard from './ColourCard';

interface PropNoteButton {
  archive: () => void;
  trash: () => void;
  unarchive?: () => void;
  isArchivedPage?: boolean; 
  colorNote: (color: string) => void;
  noteId: number; // Assuming noteId is passed as a prop
}

const NoteButtons: React.FC<PropNoteButton> = ({ archive, trash, unarchive = () => {}, isArchivedPage = false, colorNote, noteId }) => {
  const [colorCardVisible, setColorCardVisible] = useState(false);
  const colorButtonRef = useRef<HTMLDivElement>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const handleColorButtonClick = () => {
    setSelectedNoteId(noteId); // Set selectedNoteId to noteId when button is clicked
    setColorCardVisible(!colorCardVisible);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (colorButtonRef.current && !colorButtonRef.current.contains(e.target as Node)) {
      setColorCardVisible(false);
    }
  };

  const handleColorSelection = (color: string) => {
    if (selectedNoteId !== null) {
      colorNote(color); // Call colorNote function with color parameter
      setSelectedNoteId(null); // Clear selectedNoteId after selection
    }
    setColorCardVisible(false); // Hide color card after selection
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="button-container-wrapper" ref={colorButtonRef}>
      <div className="button-container">
        <button title="Remind me">
          <AddAlertOutlinedIcon color="primary" fontSize="small" />
        </button>
        <button title="Collaborator">
          <PersonAddAltIcon fontSize="small" />
        </button>
        <button title="Background Color" onClick={handleColorButtonClick}>
          <PaletteOutlinedIcon fontSize="small" />
        </button>
        <button title="Image Upload">
          <ImageOutlinedIcon fontSize="small" />
        </button>
        {isArchivedPage ? (
          <button title="Unarchive" onClick={unarchive}>
            <UnarchiveOutlinedIcon fontSize="small" />
          </button>
        ) : (
          <button title="Archive" onClick={archive}>
            <ArchiveOutlinedIcon fontSize="small" />
          </button>
        )}
        <button title="Trash" onClick={trash}>
          <DeleteOutlinedIcon fontSize="small" />
        </button>
      </div>
      {colorCardVisible && <ColourCard handleColorSelection={handleColorSelection} />}
    </div>
  );
};

export default NoteButtons;
