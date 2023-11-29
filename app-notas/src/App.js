import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

function App() {
  const [notes, setNotes] = useState([]);
  const a=0;
  console.log(notes);

  useEffect(() => {
    // Cargar notas desde el almacenamiento local al inicio
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <h1>Notas en React</h1>
      <NoteList notes={notes} onDeleteNote={handleDeleteNote} />
      <NoteEditor onAddNote={handleAddNote} />
    </div>
  );

  
}

export default App;
