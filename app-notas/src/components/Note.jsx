import React from 'react';

function Note({ note, onDeleteNote }) {
  return (
    <div>
      <p>{note.content}</p>
      <button onClick={() => onDeleteNote(note.id)}>Delete</button>
    </div>
  );
}

export default Note;
