import React from 'react';
import Note from './Note.jsx';

function NoteList({ notes, onDeleteNote }) {
  return (
    <div>
      <h2>Notas</h2>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDeleteNote={onDeleteNote} />
      ))}
    </div>
  );
}

export default NoteList;
