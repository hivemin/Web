import React, { useState } from 'react';

function NoteEditor({ onAddNote }) {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      const note = {
        id: Date.now(),
        content: newNote,
      };
      onAddNote(note);
      setNewNote('');
    }
  };

  return (
    <div>
      <h2>Añadir Nota</h2>
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default NoteEditor;
