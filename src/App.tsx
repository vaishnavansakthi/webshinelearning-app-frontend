import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { Login, SignUp } from "./components/organisms"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
