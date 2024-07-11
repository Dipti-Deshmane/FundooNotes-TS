import "./../Styles/addNote.scss";
import NoteButtons from "./NoteButtons";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import NoteServices, { Note as NoteType } from "./../Services/NoteServices"; // Import NoteType from NoteServices

interface AddNoteProps {
  newNote: NoteType;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddNote: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({
  newNote,
  onTitleChange,
  onTextChange,
  onAddNote,
}) => {

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const addNoteRef = useRef<HTMLDivElement>(null);

  const toggleAddNote = () => {
    setIsAddNoteOpen(!isAddNoteOpen);
  };
  const toggleCloseAddNote = () => {
    setIsAddNoteOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      addNoteRef.current &&
      !addNoteRef.current.contains(event.target as Node)
    ) {
      setIsAddNoteOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={addNoteRef} className="add-note">
      {isAddNoteOpen ? (
        <>
          <div>
            <input
              type="text"
              style={{ fontSize: 18 }}
              placeholder="Title"
              value={newNote.title}
              onChange={onTitleChange}
              autoFocus
            />
          </div>
          <div>
            <textarea
              placeholder="Take a note..."
              value={newNote.description}
              onChange={onTextChange}
              autoFocus
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
              <button title="Background Options">
                <PaletteOutlinedIcon fontSize="small" />
              </button>
              <button title="Image Upload">
                <ImageOutlinedIcon fontSize="small" />
              </button>
              <button title="Archive">
                <ArchiveOutlinedIcon fontSize="small" />
              </button>
              <button title="More Options">
                <MoreVertIcon fontSize="small" />
              </button>
            </div>
            <button
              title="Add"
              className="closeIcon"
              onClick={onAddNote}
            >
              Add
            </button>
            <button
              title="Close"
              className="closeIcon"
              onClick={toggleCloseAddNote}
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
