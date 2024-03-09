import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ForgotPassword, ResetPassword, Login, SignUp, SendOtp } from "./pages"
import { Layout } from "./components/templates"
import { useEffect } from "react"
import axios from "axios";

function App() {

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/get-all-user`, {
      headers: {
        'x-api-key': `${import.meta.env.VITE_X_API_Key}`,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2ZTYxYTZkLWRmM2UtNGQwOC1iMTViLTc4YjExOTA4OThkMyIsInVzZXJuYW1lIjoidmFpc2huYXZhbiIsImVtYWlsIjoidmFpc2huYXZhbm01QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTczOTMzOH0._XBLzmyVkWXh69xisi1rNmN6LavIDuq-Y4A0xgSU6Xs'
      }
      ,
    }).then((res: any) => {
      console.log(res.data)
    })
  }, [])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<SendOtp />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
