import React from 'react';
import Note from './Note.jsx';

function NoteList({ notes, onDeleteNote }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Notas</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDeleteNote={onDeleteNote} />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
