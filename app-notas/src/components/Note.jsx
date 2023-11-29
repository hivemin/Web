import React from 'react';

function Note({ note, onDeleteNote }) {
  return (
    <div className="card mb-3 $theme-colors:{$blue-500}">
      <div className="card-body">
        <p className="card-text">{note.content}</p>
        <button
          className="btn btn-danger"
          onClick={() => onDeleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
