import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login, SignUp, ForgotPassword, ResetPassword } from "./components/organisms"
import { Layout } from "./components/templates"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
