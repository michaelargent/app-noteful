import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

class NotePageMain extends React.Component {
  static contextType = NotesContext;

  render() {

    // Find the note that has the same id from the url (:noteId) using 'match'
    const selectedNote = this.context.notes.find(
      note => note.id === this.props.match.params.noteId
    )

    return (
      <div className="Main">
        <Note modified={selectedNote.modified} id={selectedNote.id } name={selectedNote.name} />
        <p>{selectedNote.content}</p>
      </div>
    );
  }

}

NotePageMain.propTypes = {
  match: PropTypes.object
}

export default NotePageMain;
