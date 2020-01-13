import React from 'react';
import { Route, Link } from 'react-router-dom';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

class NoteListMain extends React.Component {

  static contextType = NotesContext;

  // state = {
  //   showNewNoteForm: false,
  // }

  // showAddNote = () => {
  //   this.setState({
  //     showNewNoteForm: true,
  //   })
  // }

  // hideAddNote = () => {
  //   this.setState({
  //     showNewNoteForm: false,
  //   })
  // }

  /*
  function that takes an array of notes and filters them against the :folderId
  in the url if it exists, otherwise just return the entire notes array
  */
  getNotesForFolder = (notesArray) => {
    if (this.props.match.params.folderId) {
      return notesArray.filter((note) => {
        return note.folderId === this.props.match.params.folderId
      })
    }

    return notesArray
  }

  render() {

    const notes = this.getNotesForFolder(this.context.notes)

    return (
      <div className="Main">
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => {
            return (
              <Note modified={note.modified} key={note.id} id={note.id} name={note.name} />
            )
          })}
        </ul>
        <Link to='/addNote'><button>New Note</button></Link>
      </div>
    );
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object
}

NoteListMain.defaultProps = {
  notes: []
}

export default NoteListMain;
