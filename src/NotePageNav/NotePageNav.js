import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

class NotePageNav extends React.Component {
  static contextType = NotesContext;

  render() {

    //find the id of the note that matches the noteId from the url
    const selectedFolderId = this.context.notes.find(
      note => note.id === this.props.match.params.noteId
    ).folderId

    // find the folder with the id that matches 'selectedFolderId'
    const selectedFolder = this.context.folders.find(
      folder => folder.id === selectedFolderId
    )

    return (
      <div className="Sidebar">
        <Link to='/'>Go Back</Link>
        <h2>Current Folder: {selectedFolder.name}</h2>
      </div>
    );
  }

}

NotePageNav.propTypes = {
  match: PropTypes.object,
}

export default NotePageNav;
