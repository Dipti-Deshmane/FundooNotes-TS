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

const Dashboard: React.FC<DashboardProps> = (props) => {
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    description: ''
  });

  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleNoteTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleNoteTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote({ ...newNote, description: e.target.value });
  };

  const fetchNotes = async () => {
    try {
      const response = await NoteServices.fetchNotes(token);
      console.log('Fetched notes data:', response);
      const data: NoteType[] = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (newNote.title.trim() !== '' || newNote.description.trim() !== '') {
      try {
        await NoteServices.addNote({ ...newNote }, token);
        console.log('Successfully added');
        fetchNotes();
        setNewNote({ title: '', description: '' });
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const updateNote = async (noteId: number, updatedNote: NoteType) => {
    try {
      await NoteServices.updateNote(noteId, updatedNote, token);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleArchive = async (noteId: number) => {
    try {
      await NoteServices.setNoteToArchive([noteId], token);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      console.log('Note is archived');
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
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, color: color } : note
        )
      );
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

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };


  return (
    <div className="dashboard-container">
   <div className={`notes-container ${!isMenuSidebar ? 'shifted' : ''}`}>
        <AddNote
          newNote={newNote}
          onTitleChange={handleNoteTitleChange}
          onTextChange={handleNoteTextChange}
          onAddNote={addNote}
          colorNote={handleColor}
          archiveNote={handleArchive}
          trashNote={handleTrash}
        />
        <div className="note-dashboard">
          <div className="pinned-notes-container">
            {filteredNotes
              .filter((note) => note.isPined)
              .map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  updateNote={updateNote}
                  archiveNote={handleArchive}
                  trashNote={handleTrash}
                  colorNote={handleColor}
                  pinNote={handlePin}
                  unpinNote={handleUnPin}
                />
              ))}
          </div>
          <div className="unpinned-notes-container">
            {filteredNotes
              .filter((note) => !note.isPined && !note.isArchived) 
              .map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  updateNote={updateNote}
                  archiveNote={handleArchive}
                  trashNote={handleTrash}
                  colorNote={handleColor}
                  pinNote={handlePin}
                  unpinNote={handleUnPin}
                />
              ))}
          </div>
        </div>
        {filteredNotes.length === 0 && (
          <div className="no-notes-placeholder">
            <LightbulbOutlinedIcon />
            <p>Notes you add appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
