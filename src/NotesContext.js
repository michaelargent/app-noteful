import React from 'react'

const NotesContext = React.createContext({
  /*
  set up some default values. notes and folders
  will be updated after api requests complete
  */
  notes: [],
  folders: [],
  addFolder: () => {},
  deleteFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default NotesContext;