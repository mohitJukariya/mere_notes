import './App.css'
import About from './components/About'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NoteState from './context/noteState'
import Alert from './components/Alert'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App
