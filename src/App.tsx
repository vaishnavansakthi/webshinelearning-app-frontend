import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ForgotPassword, ResetPassword, Login, SignUp, SendOtp, AdminDashboard, Profile, NotFound } from "./pages"
import { Layout } from "./components/templates"
import { decryptData } from "./utils/security"

function App() {
  const myToken = decryptData('userData', 'object')
  console.log(myToken)

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={myToken !== null ? <Navigate to={"/admin-dashboard"} /> : <Login />} />
          <Route path="/signup" element={myToken !== null ? <Navigate to={"/admin-dashboard"} /> : <SignUp />} />
          <Route
            path="/forgot-password"
            element={myToken !== null ? <Navigate to={"/admin-dashboard"} /> : <ForgotPassword />}
          />
          <Route
            path="/reset-password"
            element={myToken !== null ? <Navigate to={"/admin-dashboard"} /> : <ResetPassword />}
          />
          <Route path="/verify-otp" element={myToken !== null ? <Navigate to={"/admin-dashboard"} /> : <SendOtp />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={myToken !== null ? <NotFound /> : <Login />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
