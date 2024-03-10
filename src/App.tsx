import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ForgotPassword, ResetPassword, Login, SignUp, SendOtp, AdminDashboard, Profile } from "./pages"
import { Layout } from "./components/templates"

function App() {
  const myToken: string = localStorage.getItem("userData")!
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
          <Route path="*" element={myToken !== null ? <Navigate to={"/admin-dashboard"} /> : <Login />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
