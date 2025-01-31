import React from 'react';
import config from '../config'
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

// Found this on stack overflow: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
function formatDate(date) {

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

class Note extends React.Component {

  static contextType = NotesContext;


  handleClickDelete = e => {

    // 'e' will be the event object generated by the user interaction
    // - the default behavior for the button:
    e.preventDefault()

    // Get the note id from props
    const noteId = this.props.id

    // make an api request
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
       'content-type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))

        // runs if request fails
        return res.json()
    })
    .then(() => {
      // fire the deleteNote method passed down through context
      this.context.deleteNote(noteId)
    })
    .catch(error => {
      // If there is an error console.log it
      console.error({ error })
    })
  }

  render() {

    const modified = formatDate(new Date(this.props.modified));

    return (
      <li className="Note">
        <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>
        <div>
          <p>Last modified: {modified}</p>

          <button onClick={this.handleClickDelete}>Delete Note</button>
        </div>
      </li>
    );
  }

}

Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}

export default Note;
