import { React, useContext, useState } from 'react'
import noteContext from '../context/noteContext'

function Addnote() {
  const context = useContext(noteContext)
  const { addNote } = context

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({
      title: "",
      description: "",
      tag: "",
    })
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="container ml-5 mr-5 my-5">
          <div className="mb-3">
            <label htmlFor="title" className="form-label" >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label"
              
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="tag"
              className="form-label"
              
            >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addnote