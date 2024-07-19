import React, { useState, useEffect } from "react";
import NoteServices, { Note as NoteType } from "./../Services/NoteServices";
import Note from "./Note";
import Header from "./Header";
import Sidebar from "./Sidebar";
import archiveImg from "./../Assets/archiveImg.png";
import "./../Styles/trash.scss";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

const Archive: React.FC =()=>{

      const [archivedNotes, setArchivedNotes] = useState<NoteType[]>([]);
      const token = localStorage.getItem("token") || "";
      const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
      const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');


      const fetchArchivedNotes = async () => {
        try {
          const response = await NoteServices.fetchArchiveNotes(token);
          console.log("Fetched archive notes data:", response);
          const data: NoteType[] = Array.isArray(response.data.data)
            ? response.data.data
            : [];
            setArchivedNotes(data);
        } catch (error) {
          console.error("Error fetching trash notes:", error);
        }
      };
    
      useEffect(() => {
        fetchArchivedNotes();
      }, []);

      const handleUnArchive = async (noteId: number) => {
        try {
          await NoteServices.setNoteToUnArchive([noteId], token);
          setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          console.log("Note is Unarchived");
        } catch (error) {
          console.error('Error Unarchiving note:', error);
        }
      };
      const handleTrash = async (noteId: number) => {
        try {
          await NoteServices.setNoteToTrash([noteId], token);
          setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
          console.log("Note is deleted");
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      };
  
    
      return (
           
          <div className={`trash-notes-container`}>
                  {archivedNotes.length === 0 ? (
                    <div className="BackImg">
                   <ArchiveOutlinedIcon style={{fontSize:120}}/>
                   <p className="noNote" >Your archived note appear here</p>
                   </div>
                  ) : (
                    archivedNotes.map((note) => (
                      <Note key={note.id} note={note} unarchiveNote={handleUnArchive}
                      isArchivedPage={true} trashNote={handleTrash}  layoutMode={layoutMode}/>
                    ))
                  )}
                </div>
           
            
      );
   
};
export default Archive;