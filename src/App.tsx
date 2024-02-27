import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { Login, SignUp } from "./components/organisms"
import { Layout } from "./components/templates"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
