import React, { Component } from "react";
import config from '../config';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      }
    };
  }

  static contextType = NotesContext;

  NewFolder = (newFolderName) => {
    this.setState({
      name: {
        value: newFolderName,
        touched: true
      }
    })
  }

  generateErrorMessage = () => {
    let newFolderName = this.state.name.value;
    newFolderName = newFolderName.replace(/[\s-]/g, ''); // Remove whitespace and dashes

    // if (newFolderName.length == 0 && !this.state.name.touched) {
    //   return 'Folder names must be alphanumeric and less than 20 characters.'
    // } else if (newFolderName.length == 0 && this.state.name.touched) {
    //   return 'Folder names must be alphanumeric and less than 20 characters.'
    if (!/^[a-zA-Z0-9]*$/gm.test(newFolderName) && this.state.name.touched) {
      return 'Folder names must be alphanumeric!'
    // } else if (/[\s-]/gm.test(newFolderName) && this.state.name.touched) {
    //   return 'Folder names must not contain spaces!'
    } else if (newFolderName.length >= 20) {
      return 'Please use less than 20 characters!'
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // const name = e.target[0].value
    const name = e.target[0].value
    // .replace(/[\s-]/g, '')

    console.log(name)

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
       'content-type': 'application/json'
      },
      body: JSON.stringify({name}),
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))

        // runs if request fails
        return res.json()
    })
    .then((data) => {
      // fire the deleteNote method passed down through context
      this.context.addFolder(data)
      // const id = data.id
      console.log(data, data.id)
      this.props.history.push(`/folders/${data.id}`)
      this.props.cancel()
    })
    .catch(error => {
      // If there is an error console.log it
      console.error({ error })
    })
  }

  render() {
    return (
        <form className="new-folder" onSubmit={(e) => {this.handleSubmit(e)}}>
          <h2>New Folder</h2>
          <div className="new-folder-inputs">
            <label htmlFor="folderName">Folder Name:</label>
            <input
              type="text"
              className="folderName"
              name="folder-name"
              id="folder-name"
              value={this.state.name.value}
              onChange={(event) => {this.NewFolder(event.target.value)}}
            />
          </div>
          <div className="new-folder-buttons">
            <button
              type="submit"
              className="add-new-folder-button"
              disabled={this.generateErrorMessage() || !this.state.name.value}
            >
              Save
            </button>
            <button
              type="button"
              className="cancel-new-folder-button"
              onClick={() => {this.props.cancel()}}
            >
            Cancel
            </button>
            {this.generateErrorMessage() ? <p>{this.generateErrorMessage()}</p> : ''}
          </div>
        </form>
    );
  }
}

AddFolder.propTypes = {
  cancel: PropTypes.func
}

export default AddFolder;