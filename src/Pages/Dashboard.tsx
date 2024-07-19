import React, { useState, useEffect, ChangeEvent } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Note from '../Components/Note';
import AddNote from '../Components/AddNote';
import NoteServices, { Note as NoteType } from './../Services/NoteServices';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import './../Styles/dashboard.scss';

interface DashboardProps {
  note?: NoteType;
  updateColor?: (color: string, id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => { const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [pageTitle, setPageTitle] = useState('');
  const token = localStorage.getItem("token") || "";
  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical'); 
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(note => note.isPined);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPined);

  const toggleLayoutMode = () => {
    setLayoutMode(prevMode => (prevMode === 'vertical' ? 'horizontal' : 'vertical'));
  };

  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleNoteTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote({ ...newNote, description: e.target.value });
  };

  const fetchNotes = async () => {
    const response = await NoteServices.fetchNotes(token);
    const data: NoteType[] = Array.isArray(response.data.data) ? response.data.data : [];
    setNotes(data);
  };

  const addNote = async () => {
    if (newNote.title.trim() !== "" || newNote.description.trim() !== "") {
      console.log("Adding note...");
      await NoteServices.addNote({ ...newNote }, token);
      fetchNotes();
      setNewNote({ title: "", description: "" });
    }
  };

  const updateNote = async (id: number, updatedNote: NoteType) => {
    try {
      await NoteServices.updateNote(id, updatedNote, token);
      fetchNotes();
      console.log('Note updated successfully');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleArchive = async (noteId: number) => {
    try {
      await NoteServices.setNoteToArchive([noteId], token);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId && !note.isArchived));
      console.log("Note is archived");
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  const handleTrash = async (noteId: number) => {
    try {
      await NoteServices.setNoteToTrash([noteId], token);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      console.log("Note is deleted");
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleColor = async (noteId: number, color: string) => {
    try {
      await NoteServices.setColor([noteId], token, color);
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note.id === noteId ? { ...note, color } : note
        );
        console.log('Updated Notes:', updatedNotes);
        return updatedNotes;
      });
      console.log('Note color applied');
    } catch (error) {
      console.error('Error color note:', error);
    }
  };

  const handlePin = async (noteId: number) => {
    try {
      await NoteServices.pinNote([noteId], token);
      fetchNotes();
      console.log("Note is pinned");
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  const handleUnPin = async (noteId: number) => {
    try {
      await NoteServices.unPinNote([noteId], token);
      fetchNotes();
      console.log("Note is unpinned");
    } catch (error) {
      console.error("Error unpinning note:", error);
    }
  };



  return (
    <>
        <div className={`add-note-container ${searchText.trim() !== '' ? 'hidden' : ''}`}>
            <AddNote newNote={newNote} onTitleChange={handleNoteTitleChange} onTextChange={handleNoteTextChange} onAddNote={addNote} />
          </div>
          {filteredNotes.length === 0 ? (
            <div className='bgImage'>
              <LightbulbOutlinedIcon style={{ fontSize: 120 }} className='dashimg'/>
              <p className='text'>Notes you add appear here</p>
             </div>
          ) : (
            <>
             {pinnedNotes.length > 0 && searchText.trim() === '' && (
              <h2 className='note-head-container' style={{ marginLeft: layoutMode === 'vertical' ? '12px' : '220px'}}>PINNED</h2>)}
               
              <div className="pinned-notes-container">
              <>
              
                  {pinnedNotes.map(note => (
                    <Note
                      key={note.id}
                      note={note}
                      layoutMode={layoutMode}
                      updateNote={updateNote}
                      archiveNote={handleArchive}
                      trashNote={handleTrash}
                      colorNote={handleColor}
                      pinNote={handlePin}
                      unpinNote={handleUnPin}
                
                    />
                  ))}
              
                </>
              </div>
                     {pinnedNotes.length > 0 && searchText.trim() === '' && (
      <h2 className='note-head-container' style={{ marginLeft: layoutMode === 'vertical' ? '12px' : '220px'}}>OTHERS</h2>
  )}
              <div className="unpinned-notes-container">
       
                <>
            
                  {unpinnedNotes
                  .filter(note => (
                    !note.isArchived && !note.isDeleted
                  ))
                  .map(note => (
                    <Note
                      key={note.id}
                      note={note}
                      layoutMode={layoutMode}
                      updateNote={updateNote}
                      archiveNote={handleArchive}
                      trashNote={handleTrash}
                      colorNote={handleColor}
                      pinNote={handlePin}
                      unpinNote={handleUnPin}
             
                    />
                  ))}
               
                </>
              </div>
            </>
          )}
       </>
  );
}
export default Dashboard;
