import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import SignUp from "./components/organisms/SignUp/SignUp.tsx"
import Login from "./components/organisms/Login/Login.tsx"


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
