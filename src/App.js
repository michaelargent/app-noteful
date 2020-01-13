import React from 'react';
import './App.css';
// import STORE from './dummyStore'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import { Route, Switch, Link } from 'react-router-dom';
import NotesContext from './NotesContext'
import config from './config'
import AddNote from './AddNote/AddNote'
// import AddFolder from './AddFolder/AddFolder';
import ErrorBoundary1 from './ErrorBoundary1/ErrorBoundary1';

class App extends React.Component {

  state = {
    notes: [],
    folders: []
  };

  //componentDidMount fires when the component renders for the first time
  componentDidMount() {

      // send two requests to the API, one for notes, and one for folders
      Promise.all([
          fetch(`${config.API_ENDPOINT}/notes`),
          fetch(`${config.API_ENDPOINT}/folders`)
      ])
      .then(([notesRes, foldersRes]) => {
          if (!notesRes.ok)
              return notesRes.json().then(e => Promise.reject(e));
          if (!foldersRes.ok)
              return foldersRes.json().then(e => Promise.reject(e));

          return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
          this.setState({notes, folders});
      })
      .catch(error => {
          console.error({error});
      });
  }

  // The callback prop used to remove the note from the array in state

  deleteFolder = (folderId) => {
    this.setState({
        folders: this.state.folders.filter(folder => folder.id !== folderId)
    });
    console.log(this.state.folders)
  }

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
    console.log(this.state.notes)
  };

  handleAddFolder = (name) => {
    const folders = this.state.folders
    const newFolders = folders.concat(name)
    this.setState({
      folders: newFolders,
    })
    console.log(newFolders)
    console.log(this.state.folders)
  }

  addNote = (noteData) => {
    console.log(noteData)
    console.log(this.state.notes)

    const notes = this.state.notes
    const newNotes = notes.concat(noteData)
    console.log(notes, newNotes)
    this.setState({
      notes: newNotes,
    })
    // this.props.history.push('/')
  }

  render() {

    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addNote: this.addNote,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      deleteFolder: this.deleteFolder,
    }

    return (
      <div className="App">

        {/*
          Override the default values in NotesContext.js with the items set
          above in 'contextValue'
        */}
        <ErrorBoundary1>
        <NotesContext.Provider value={contextValue}>
          <header className="App-header">
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>

          <aside>
            {/* Show/hide components in SIDEBAR section based on route */}
            {/* Main Route */}
            <Route
              exact
              path='/'
              component={NoteListNav}
            />
            {/* Folder Route */}
            <Route
              exact
              path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
              component={NoteListNav}
            />
            {/* Note Route */}
            <Route
              exact
              path='/notes/:noteId'
              component={NotePageNav}
            />
            <Route
              exact
              path='/addNote'
              component={NoteListNav}
            />
          </aside>


          <main>
            {/* Show/hide components in 'MAIN' section based on route */}
            {/* Main Route */}
            <Route
              exact
              path='/'
              component={NoteListMain}
            />
            {/* Folder Route */}
            <Route
              exact
              path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
              component={NoteListMain}
            />
            {/* Note Route */}
            <Route
              exact
              path='/notes/:noteId'
              component={NotePageMain}
            />
            <Route
              exact
              path='/addNote'
              component={AddNote}
            />
          </main>
        </NotesContext.Provider>
        </ErrorBoundary1>
      </div>
    );
  }
}

export default App;
