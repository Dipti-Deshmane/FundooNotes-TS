import React, { useState } from 'react';
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./../Styles/dashboard.scss";
import { Card } from 'reactstrap';
import "./../Styles/noteButton.scss";
import Trash from './Trash';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';



interface PropNoteButton {
  archive: () => void;
  trash:() => void;
  unarchive?: () => void;
  isArchivedPage?: boolean; 
}

const NoteButtons: React.FC<PropNoteButton> = ({ archive,trash ,  unarchive = () => {},  isArchivedPage = false}) => {
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);

  const handleMoreOptionsClick = () => {
    setMoreOptionsVisible(!moreOptionsVisible);
  };

  return (
    <div className="button-container-wrapper">
      <div className="button-container">
        <button title="Remind me">
          <AddAlertOutlinedIcon color="primary" fontSize="small" />
        </button>
        <button title="Collaborator">
          <PersonAddAltIcon fontSize="small" />
        </button>
        <button title="Background Options">
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
    </div>
  );
};

export default NoteButtons;
