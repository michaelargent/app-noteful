import React, { Component } from 'react'
import config from '../config'
import NotesContext from '../NotesContext'

export default class AddNote extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: "",
			name: {
				value: "",
				touched: false
			},
			text: {
				value: "",
			}
		}
	}

	static contextType = NotesContext;

	generateErrorMessage = () => {
		let newTextName = this.state.name.value;
    newTextName = newTextName.replace(/[\s-]/g, ''); // Remove whitespace and dashes

    if (!/^[a-zA-Z0-9]*$/gm.test(newTextName) && this.state.name.touched) {
      return 'Folder names must be alphanumeric!'
    } else if (/[\s-]/gm.test(newTextName) && this.state.name.touched) {
      return 'Folder names must not contain spaces!'
    } else if (newTextName.length >= 20) {
      return 'Please use less than 20 characters!'
    }
  }

	NewNote = (newNoteName) => {
		this.setState({
			name: {
				value: newNoteName,
				touched: true
			}
		})
	}

	NewText = (newNoteText) => {
		this.setState({
			text: {
				value: newNoteText
			}
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(e.target)
		console.log(e.target[0])
		const folderId = e.target[0].value
		const name = e.target[1].value
		const content = e.target[2].value
		const modified = new Date()
		console.log(folderId, name, content, modified)
		// this.context.addNote(folderId, name, content)

  fetch(`${config.API_ENDPOINT}/notes`, {
    method: 'POST',
    headers: {
     'content-type': 'application/json'
    },
		body: JSON.stringify({folderId, name, content, modified})
  })
  .then(res => {
    if (!res.ok)
      return res.json().then(e => Promise.reject(e))

      // runs if request fails
      return res.json()
  })
  .then((data) => {
    // fire the deleteNote method passed down through context
    // this.context.addNote(folderName, noteName, noteText)
		this.context.addNote(data)
		this.props.history.push(`/folders/${folderId}`)
		console.log(data)
  })
  .catch(error => {
    // If there is an error console.log it
    console.error({ error })
  })

  //   const options = {
  //     method: 'POST',
  //     body: JSON.stringify(bookmark),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer $2a$10$ZhdeJefcb.5sx/DCmO/n8u5sJLcARAdbHw9tfm1mevGRq3s1.5DpW"
  //     }
  //   };
  //   fetch(url, options)
  //     .then(res => {
  //       if(!res.ok) {
  //         throw new Error('Something went wrong, please try again later');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       this.setState({
  //         title: "",
  //         url: "",
  //         description: "",
  //         rating: 1
  //       });
  //       this.props.handleAdd(bookmark);
  //     })
  //     .catch(err => {
  //       this.setState({
  //         error: err.message
  //       });
  //     });
  // }


	}

	handleClickCancel = () => {
		this.props.history.push('/')
	}

	render() {
		const folders = this.context.folders
    return (
			<div className="Main">
        <form className="new-note" onSubmit={(e) => {this.handleSubmit(e)}}>
          <h2>New Note</h2>
          <div className="new-note-inputs">
						<label htmlFor="noteFolder">Folder:</label>
						<select
							name="noteFolders"
							id="noteFolders"
              className="noteFolder"
              aria-label='selectFolder'
						>
							{folders.map((x, i) => {
								return (
									<option key={i} value={x.id}>
										{x.name}
									</option>
								)
							})}
						</select>
            <label htmlFor="noteName">Name:</label>
            <input
              type="text"
              className="noteName"
              name="noteName"
              id="noteName"
              value={this.state.name.value}
              onChange={(e) => {this.NewNote(e.target.value)}}
            />
						<label htmlFor="noteText">Text:</label>
						<input
							type="text"
							className="noteText"
							name="noteText"
							id="noteText"
							value={this.state.text.value}
							onChange={(e) => {this.NewText(e.target.value)}}
						/>
          </div>
          <div className="new-note-buttons">
            <button
              type="submit"
              className="add-new-note-button"
              disabled={this.generateErrorMessage() || !this.state.name.value || !this.state.text.value}
            >
              Save
            </button>
            <button
              type="button"
              className="cancel-new-note-button"
              onClick={() => {this.handleClickCancel()}}
            >
            Cancel
            </button>
						{this.generateErrorMessage() ? <p>{this.generateErrorMessage()}</p> : ''}
          </div>
        </form>
			</div>
    );
  }
}