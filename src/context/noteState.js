import { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get All Note
  const getNote = async () => {
    //API  CAll
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNjQyNDk5M2Q0YzNmYTY5ZjBmMTlmIn0sImlhdCI6MTY2MjQwNTc0Mn0.oEXqNrN18D_z3pEM7mMOdqHE2mx9f0vbM2k33zaXEIs',
      },
    })
    const json = await response.json()
    setNotes(json)
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    //API  CAll
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNjQyNDk5M2Q0YzNmYTY5ZjBmMTlmIn0sImlhdCI6MTY2MjQwNTc0Mn0.oEXqNrN18D_z3pEM7mMOdqHE2mx9f0vbM2k33zaXEIs',
      },
      body: JSON.stringify({ title, description, tag }),
    })

    const note = await response.json()
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    //API  CAll
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNjQyNDk5M2Q0YzNmYTY5ZjBmMTlmIn0sImlhdCI6MTY2MjQwNTc0Mn0.oEXqNrN18D_z3pEM7mMOdqHE2mx9f0vbM2k33zaXEIs',
      },
    })
    const json = await response.json()
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API  CAll
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNjQyNDk5M2Q0YzNmYTY5ZjBmMTlmIn0sImlhdCI6MTY2MjQwNTc0Mn0.oEXqNrN18D_z3pEM7mMOdqHE2mx9f0vbM2k33zaXEIs',
      },
      body: JSON.stringify({ title, description, tag }),
    })
    const json = await response.json()

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in clietn side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break
      }
    }
    setNotes(newNotes)
  }
  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
