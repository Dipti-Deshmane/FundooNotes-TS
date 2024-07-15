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
  const [newNote, setNewNote] = useState({
    title: '',
    description: ''
  });
  const [pageTitle, setPageTitle] = useState('');
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    fetchNotes();
  }, []);

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

  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  const updateNote = async (id: number, updatedNote: NoteType) => {
    try {
      await NoteServices.updateNote(id, updatedNote, token);
      fetchNotes(); // Fetch notes after updating
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
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      console.log('Note is deleted');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleColor = async (noteId: number,color:string) => {
    try {
      await NoteServices.setColor([noteId], token,color);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      console.log('Note color applied');
    } catch (error) {
      console.error('Error color note:', error);
    }
  };

 
  const toggleLayoutMode = () => {
    setLayoutMode(layoutMode === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <div className='note-dashboard'>
      <div className='App'>
        <Header toggleSidebar={toggleMenubar} pageTitle={pageTitle} toggleLayoutMode={toggleLayoutMode} layoutMode={layoutMode} />
        <div className='main'>
          <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
          <div className={`notes-container ${isMenuSidebar ? 'shifted' : ''} ${layoutMode}`}>
            <AddNote
              newNote={newNote}
              onTitleChange={handleNoteTitleChange}
              onTextChange={handleNoteTextChange}
              onAddNote={addNote}
            />
            {/* Displaying notes */}
            <div className={`pinned-notes-container ${layoutMode}`}>
              {notes.length === 0 ? (
                <div className='BackImg'>
                  <LightbulbOutlinedIcon style={{ fontSize: 120 }} />
                  <p className='noNote'>Note you add appear here</p>
                </div>
              ) : (
                notes
                  .filter((note) => !note.isArchived && !note.isTrashed)
                  .map((note) => (
                    <Note
                      key={note.id}
                      note={note}
                      updateNote={updateNote}
                      archiveNote={handleArchive}
                      trashNote={handleTrash}
                      colorNote={handleColor}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
