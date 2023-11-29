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
    <div className="card bg-black text-white">
      <div className="card-body">
        <h2 className="card-title">Añadir Nota</h2>
        <textarea
          className="form-control mb-2"
          rows="3"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;
